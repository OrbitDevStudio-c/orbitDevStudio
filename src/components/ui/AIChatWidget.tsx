import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUp, ChevronUp, Loader2, Mic, RotateCcw, Sparkles, Square, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Link } from 'react-router-dom';
import { useVoiceInput, voiceInputSupported } from '../../hooks/useVoiceInput';
import { track } from '../../lib/analytics';

type Role = 'user' | 'assistant';
type ChatMessage = { role: Role; content: string };

const STORAGE_KEY = 'orbit-ai-chat';
const GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Hi, I'm **Orbit AI**. Ask me about our services, tech stack, past work or how to hire our engineers.",
};
const SUGGESTIONS = [
  'What services do you offer?',
  'Can you build an AI product for us?',
  'How do your hiring models work?',
  'Show me your recent work',
];

function loadMessages(): ChatMessage[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* storage unavailable */
  }
  return [GREETING];
}

const joinText = (a: string, b: string) => (a.trim() ? `${a.trimEnd()} ${b}` : b);

const OWN_HOSTS = new Set(['orbit-dev-studio.vercel.app', window.location.host]);
const INLINE_TOKEN =/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string, onNavigate: () => void): ReactNode[] {
  return text.split(INLINE_TOKEN).map((part, i) => {
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white light:text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className = 'font-medium text-[#60a5fa] light:text-[#2563eb] underline decoration-accent/40 underline-offset-2 hover:decoration-accent';
      if (href.startsWith('/') && !href.startsWith('//')) {
        return (
          <Link key={i} to={href} onClick={onNavigate} className={className}>
            {label}
          </Link>
        );
      }
      if (href.startsWith('mailto:')) {
        return (
          <a key={i} href={href} className={className}>
            {label}
          </a>
        );
      }
      // Models sometimes invent domains; only our own host is trusted, and it routes in-app.
      try {
        const url = new URL(href);
        if (url.protocol === 'https:' && OWN_HOSTS.has(url.host)) {
          return (
            <Link key={i} to={url.pathname} onClick={onNavigate} className={className}>
              {label}
            </Link>
          );
        }
      } catch {
        /* not a URL */
      }
      return label;
    }
    return part;
  });
}

function MessageContent({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={blocks.length} className="space-y-1.5 pl-1">
        {bullets.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{renderInline(item, onNavigate)}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  };

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    const bullet = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      continue;
    }
    flushBullets();
    if (line) {
      const heading = line.replace(/^#{1,6}\s+/, '');
      blocks.push(<p key={blocks.length}>{renderInline(heading, onNavigate)}</p>);
    }
  }
  flushBullets();

  return <div className="space-y-2">{blocks}</div>;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setShowTop(window.scrollY > 600));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (lenis) lenis.scrollTo(0, { immediate: reduce });
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const appendTranscript = useCallback((text: string) => {
    setInput((prev) => (prev.trim() ? `${prev.trimEnd()} ${text}` : text));
  }, []);
  const voice = useVoiceInput(appendTranscript);
  const voiceActive = voice.state !== 'idle';

  useEffect(() => {
    if (open) track('chat_open');
    else voice.cancel();
  }, [open, voice.cancel]);

  useEffect(() => {
    if (open && voice.state === 'idle') inputRef.current?.focus();
  }, [voice.state]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage unavailable */
    }
  }, [messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, error]);

  useEffect(() => {
    if (!open) return;
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    el.scrollTop = el.scrollHeight;
  }, [input, voice.liveText]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    track('chat_message', { turn: messages.filter((m) => m.role === 'user').length + 1 });

    const history: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setError(null);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let answer = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.filter((m) => m.content !== GREETING.content) }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(res.status === 429 && data?.error ? data.error : 'unavailable');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        const snapshot = answer;
        setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: snapshot }]);
      }
      if (!answer.trim()) throw new Error('unavailable');
    } catch (e) {
      if (controller.signal.aborted) return;
      if (!answer.trim()) setMessages((prev) => prev.slice(0, -1));
      const message = e instanceof Error ? e.message : 'unavailable';
      setError(message === 'unavailable' ? 'Our assistant is briefly unavailable.' : message);
    } finally {
      setStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  }

  function reset() {
    voice.cancel();
    abortRef.current?.abort();
    setStreaming(false);
    setError(null);
    setMessages([GREETING]);
  }

  const showSuggestions = messages.length === 1 && !streaming;
  const closeOnMobile = () => window.innerWidth < 640 && setOpen(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Orbit AI"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="fixed inset-x-4 bottom-[5.5rem] z-40 flex h-[min(620px,calc(100dvh-7.5rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0B1222]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(22,119,255,0.12)] backdrop-blur-2xl light:border-slate-200 light:bg-white/95 light:shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:inset-x-auto sm:right-5 sm:w-[400px]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-white/[0.06] px-5 py-4 light:border-slate-200">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white">
                  <img src="/companylogo.webp" alt="" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0B1222] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] light:border-white" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="flex items-center gap-1.5 text-[15px] font-semibold text-white light:text-slate-900">
                  Orbit <span className="text-gradient-ai">AI</span>
                  <Sparkles size={13} className="text-brandCyan" />
                </p>
                <p className="text-xs text-slate-400 light:text-slate-500">Ask about services, tech & hiring</p>
              </div>
              <button
                onClick={reset}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white light:hover:bg-slate-100 light:hover:text-slate-900"
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white light:hover:bg-slate-100 light:hover:text-slate-900"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              aria-live="polite"
              className="hide-scrollbar flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5"
            >
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-[image:var(--gradient-primary)] px-4 py-2.5 text-[14px] leading-relaxed text-white shadow-[0_4px_20px_rgba(22,119,255,0.25)]">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                      <Sparkles size={13} className="text-accent" />
                    </div>
                    <div className="max-w-[85%] break-words rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[14px] leading-relaxed text-[#C7D2E4] light:border-slate-200 light:bg-slate-50 light:text-slate-600">
                      {m.content ? (
                        <MessageContent text={m.content} onNavigate={closeOnMobile} />
                      ) : (
                        <span className="flex items-center gap-1 py-1.5" aria-label="Orbit AI is typing">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-1.5 w-1.5 rounded-full bg-accent"
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                            />
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                )
              )}

              {error && (
                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-[13px] leading-relaxed text-amber-100 light:border-amber-300 light:bg-amber-50 light:text-amber-900">
                  {error} You can reach the team at{' '}
                  <a href="mailto:orbitdevstudios@gmail.com" className="font-medium underline underline-offset-2">
                    orbitdevstudios@gmail.com
                  </a>{' '}
                  or{' '}
                  <Link to="/hire" onClick={closeOnMobile} className="font-medium underline underline-offset-2">
                    start a project
                  </Link>
                  .
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-medium text-slate-300 transition hover:border-accent/40 hover:bg-accent/10 hover:text-white light:border-slate-200 light:bg-white light:text-slate-600 light:hover:border-accent/40 light:hover:bg-accent/5 light:hover:text-slate-900"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-white/[0.06] px-4 pb-3 pt-3 light:border-slate-200">
              <form
                onSubmit={onSubmit}
                className={`flex items-end gap-1.5 rounded-2xl border bg-white/[0.03] p-1.5 transition focus-within:border-accent/50 focus-within:shadow-[0_0_0_3px_rgba(22,119,255,0.12)] light:bg-white ${
                  voice.state === 'listening'
                    ? 'border-rose-400/40 shadow-[0_0_0_3px_rgba(244,63,94,0.10)]'
                    : 'border-white/10 light:border-slate-200'
                } ${voiceInputSupported ? '' : 'pl-4'}`}
              >
                {voiceInputSupported && (
                  <button
                    type="button"
                    onClick={voice.state === 'idle' ? voice.start : voice.state === 'listening' ? voice.stop : voice.cancel}
                    disabled={voice.state === 'transcribing'}
                    aria-label={
                      voice.state === 'starting'
                        ? 'Cancel voice input'
                        : voice.state === 'listening'
                          ? 'Stop voice input'
                          : 'Speak your message'
                    }
                    title={voice.state === 'listening' ? 'Stop' : voice.state === 'starting' ? 'Cancel' : 'Speak your message'}
                    className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      voice.state === 'listening'
                        ? 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 light:text-rose-500'
                        : 'text-slate-400 hover:bg-white/10 hover:text-white light:text-slate-500 light:hover:bg-slate-100 light:hover:text-slate-900'
                    } disabled:cursor-wait`}
                  >
                    {voice.state === 'listening' && (
                      <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-rose-400/50 animate-ping [animation-duration:1.6s]" />
                    )}
                    {voice.state === 'listening' ? (
                      <Square size={14} fill="currentColor" />
                    ) : voice.state === 'idle' ? (
                      <Mic size={18} />
                    ) : (
                      <Loader2 size={17} className="animate-spin text-accent" />
                    )}
                  </button>
                )}

                <textarea
                  ref={inputRef}
                  rows={1}
                  value={voiceActive && voice.liveText ? joinText(input, voice.liveText) : input}
                  readOnly={voiceActive}
                  maxLength={2000}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (voice.error) voice.clearError();
                  }}
                  onKeyDown={onKeyDown}
                  placeholder={
                    voice.state === 'starting'
                      ? 'Turning on the microphone…'
                      : voice.state === 'listening'
                        ? 'Listening… start speaking'
                        : voice.state === 'transcribing'
                          ? 'Transcribing your voice…'
                          : voiceInputSupported
                            ? 'Type or tap the mic to speak…'
                            : 'Ask anything about OrbitDevStudio…'
                  }
                  aria-label="Message Orbit AI"
                  className={`max-h-[120px] flex-1 resize-none bg-transparent py-2 text-[14px] text-white focus:outline-none light:text-slate-900 ${
                    voice.state === 'listening'
                      ? 'placeholder:text-rose-300 light:placeholder:text-rose-500'
                      : voiceActive
                        ? 'placeholder:text-accent'
                        : 'placeholder:text-slate-500 light:placeholder:text-slate-400'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming || voiceActive}
                  aria-label="Send message"
                  className="btn-primary !min-h-0 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <ArrowUp size={17} />
                </button>
              </form>

              {voice.state === 'listening' && (
                <div className="mt-2 flex items-center gap-2.5 px-1 text-[12px]" aria-live="polite">
                  <span className="flex h-3.5 items-center gap-[3px]" aria-hidden>
                    {[0, 1, 2, 3, 4].map((b) => (
                      <motion.span
                        key={b}
                        className="w-[3px] rounded-full bg-rose-400"
                        animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: b * 0.12, ease: 'easeInOut' }}
                      />
                    ))}
                  </span>
                  <span className="font-medium text-rose-300 light:text-rose-600">Listening</span>
                  <span className="font-mono tabular-nums text-slate-400">0:{String(voice.seconds).padStart(2, '0')}</span>
                  <button
                    type="button"
                    onClick={voice.cancel}
                    className="ml-auto rounded-lg px-2 py-0.5 font-medium text-slate-400 transition hover:bg-white/10 hover:text-white light:hover:bg-slate-100 light:hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={voice.stop}
                    className="rounded-lg px-2 py-0.5 font-semibold text-accent transition hover:bg-accent/10"
                  >
                    Done
                  </button>
                </div>
              )}
              {voice.error && (
                <p role="alert" className="mt-2 text-center text-[12px] text-amber-300 light:text-amber-700">
                  {voice.error}
                </p>
              )}
              <Link
                to="/hire"
                onClick={closeOnMobile}
                className="group mt-2.5 flex items-center justify-center gap-1.5 text-[12px] font-medium text-slate-400 transition hover:text-white light:text-slate-500 light:hover:text-slate-900"
              >
                Prefer a human? Book a free strategy call
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top: stacked above the launcher so the two never overlap */}
      <AnimatePresence>
        {showTop && !open && (
          <motion.button
            key="back-to-top"
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            aria-label="Back to top"
            title="Back to top"
            data-track="back_to_top"
            className="fixed bottom-[5.5rem] right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0B1222]/85 text-slate-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-accent/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent light:border-slate-200 light:bg-white/90 light:text-slate-600 light:shadow-[0_8px_24px_rgba(15,23,42,0.12)] light:hover:text-slate-900 sm:right-6"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with Orbit AI'}
        aria-expanded={open}
        className="btn-primary group fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2.5 rounded-full px-4 sm:px-5"
      >
        {!open && (
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-brandCyan/40 animate-ping [animation-duration:2.5s] [animation-iteration-count:3]" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {open ? <X size={22} /> : <Sparkles size={22} />}
          </motion.span>
        </AnimatePresence>
        {!open && <span className="hidden text-sm font-semibold sm:inline">Ask Orbit AI</span>}
      </motion.button>
    </>
  );
}
