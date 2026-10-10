import { useCallback, useEffect, useRef, useState } from 'react';

/** starting = mic warming up; listening = ready, user can speak; transcribing = record-mode upload. */
export type VoiceState = 'idle' | 'starting' | 'listening' | 'transcribing';

// Minimal Web Speech API typings (not in every TS lib.dom version, and Chrome/Safari prefix it).
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

const getRecognition = (): RecognitionCtor | undefined => {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};

const canRecord =
  typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof window.MediaRecorder !== 'undefined';

export const voiceInputSupported = !!getRecognition() || canRecord;

const MIME_TYPES = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
const MAX_SECONDS = 60;
// Browsers whose speech service is unavailable (e.g. Brave) report these; we then fall back to recording.
const LIVE_UNAVAILABLE = ['network', 'service-not-allowed', 'language-not-supported'];
let liveBroken = false;

const joinWords = (a: string, b: string) => (a && b ? `${a.trimEnd()} ${b.trimStart()}` : a || b);

/**
 * Voice input for the chat box. Uses live browser speech recognition (text streams in while the
 * user speaks) and falls back to recording + Groq Whisper transcription where that isn't available.
 * `onCommit` receives the final text when listening ends.
 */
export function useVoiceInput(onCommit: (text: string) => void) {
  const [state, setState] = useState<VoiceState>('idle');
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [liveText, setLiveText] = useState('');

  const onCommitRef = useRef(onCommit);
  const recognitionRef = useRef<Recognition | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const busyRef = useRef(false);
  const discardRef = useRef(false);
  const textRef = useRef('');

  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  const finish = useCallback((commit: boolean) => {
    const text = textRef.current.trim();
    textRef.current = '';
    setLiveText('');
    recognitionRef.current = null;
    busyRef.current = false;
    setState('idle');
    if (commit && text) onCommitRef.current(text);
  }, []);

  const backupRef = useRef<{ recorder: MediaRecorder; chunks: Blob[]; stream: MediaStream } | null>(null);

  const transcribeBlob = useCallback(async (blob: Blob) => {
    setState('transcribing');
    try {
      const res = await fetch('/api/transcribe', { method: 'POST', headers: { 'Content-Type': blob.type }, body: blob });
      const data = await res.json().catch(() => null);
      if (res.status === 429) throw new Error(data?.error);
      if (!res.ok) throw new Error();
      if (data?.text) onCommitRef.current(data.text);
      else setError("Didn't catch that. Please try again.");
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : 'Voice input is unavailable right now. Please type your message.');
    } finally {
      busyRef.current = false;
      setState('idle');
    }
  }, []);

  /** Records alongside live recognition so a silent recognition service can fall back to Whisper. */
  const startBackup = useCallback(async (owner: Recognition) => {
    if (!canRecord) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      if (recognitionRef.current !== owner) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      const mimeType = MIME_TYPES.find((t) => MediaRecorder.isTypeSupported(t));
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      recorder.start();
      backupRef.current = { recorder, chunks, stream };
    } catch {
      // Live recognition reports permission problems itself.
    }
  }, []);

  const stopBackup = useCallback(
    () =>
      new Promise<Blob | null>((resolve) => {
        const backup = backupRef.current;
        backupRef.current = null;
        if (!backup) return resolve(null);
        const done = () => {
          backup.stream.getTracks().forEach((t) => t.stop());
          resolve(new Blob(backup.chunks, { type: (backup.recorder.mimeType || 'audio/webm').split(';')[0] }));
        };
        if (backup.recorder.state === 'inactive') return done();
        backup.recorder.onstop = done;
        backup.recorder.stop();
      }),
    []
  );

  const startRecording = useCallback(async () => {
    setState('starting');
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (e) {
      const name = e instanceof DOMException ? e.name : '';
      setError(
        name === 'NotAllowedError'
          ? 'Microphone access is blocked. Allow it in your browser settings.'
          : 'No microphone was found on this device.'
      );
      busyRef.current = false;
      setState('idle');
      return;
    }
    if (discardRef.current) {
      stream.getTracks().forEach((t) => t.stop());
      busyRef.current = false;
      setState('idle');
      return;
    }

    const mimeType = MIME_TYPES.find((t) => MediaRecorder.isTypeSupported(t));
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      recorderRef.current = null;
      const blob = new Blob(chunks, { type: (recorder.mimeType || 'audio/webm').split(';')[0] });
      if (discardRef.current || blob.size < 1000) {
        busyRef.current = false;
        setState('idle');
        return;
      }
      void transcribeBlob(blob);
    };

    recorder.start();
    recorderRef.current = recorder;
    setSeconds(0);
    setState('listening');
  }, [transcribeBlob]);

  const startLive = useCallback(
    (Ctor: RecognitionCtor) => {
      const rec = new Ctor();
      rec.lang = navigator.language || 'en-US';
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      let finalText = '';
      let ready = false;
      let fallBack = false;
      const markReady = () => {
        if (ready || recognitionRef.current !== rec) return;
        ready = true;
        setSeconds(0);
        setState('listening');
      };

      // "Ready" is when audio capture actually begins; onstart is a fallback for browsers that skip it.
      rec.onaudiostart = markReady;
      rec.onstart = () => window.setTimeout(markReady, 900);
      rec.onresult = (e) => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const piece = e.results[i][0].transcript;
          if (e.results[i].isFinal) finalText = joinWords(finalText, piece.trim());
          else interim = joinWords(interim, piece.trim());
        }
        textRef.current = joinWords(finalText, interim);
        setLiveText(textRef.current);
      };
      rec.onerror = (e) => {
        if (e.error === 'aborted') return;
        if (LIVE_UNAVAILABLE.includes(e.error) && !textRef.current) {
          liveBroken = true;
          fallBack = true;
          return;
        }
        if (e.error === 'not-allowed') setError('Microphone access is blocked. Allow it in your browser settings.');
        else if (e.error === 'no-speech') setError("Didn't catch that. Please try again.");
        else if (e.error === 'audio-capture') setError('No microphone was found on this device.');
        else setError('Voice input stopped unexpectedly. Please try again.');
      };
      rec.onend = async () => {
        if (recognitionRef.current !== rec) return;
        recognitionRef.current = null;
        const backup = await stopBackup();
        if (discardRef.current) return finish(false);
        if (fallBack) return void startRecording();
        if (!textRef.current.trim() && backup && backup.size > 1000) {
          setLiveText('');
          return void transcribeBlob(backup);
        }
        finish(true);
      };

      recognitionRef.current = rec;
      setState('starting');
      try {
        rec.start();
        void startBackup(rec);
      } catch {
        liveBroken = true;
        recognitionRef.current = null;
        void startRecording();
      }
    },
    [finish, startRecording, startBackup, stopBackup, transcribeBlob]
  );

  const start = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    discardRef.current = false;
    textRef.current = '';
    setLiveText('');
    setError(null);
    const Ctor = getRecognition();
    if (Ctor && !liveBroken) startLive(Ctor);
    else if (canRecord) void startRecording();
    else {
      busyRef.current = false;
      setError('Voice input is not supported in this browser.');
    }
  }, [startLive, startRecording]);

  const stop = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    else if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
  }, []);

  const cancel = useCallback(() => {
    discardRef.current = true;
    if (recognitionRef.current) recognitionRef.current.abort();
    else if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
  }, []);

  useEffect(() => {
    if (state !== 'listening') return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (seconds >= MAX_SECONDS) stop();
  }, [seconds, stop]);

  useEffect(() => cancel, [cancel]);

  return {
    state,
    seconds,
    error,
    /** Text recognised so far in the current live session (empty in record mode). */
    liveText,
    start,
    stop,
    cancel,
    clearError: () => setError(null),
  };
}
