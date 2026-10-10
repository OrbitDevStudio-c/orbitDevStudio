import { guard, json } from './_lib/guard.js';

// Vercel caps request bodies at 4.5 MB; 60 s of Opus speech is well under 1 MB.
const MAX_BYTES = 4 * 1024 * 1024;
const EXTENSIONS = {
  'audio/webm': 'webm',
  'audio/ogg': 'ogg',
  'audio/mp4': 'mp4',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'audio/x-m4a': 'm4a',
};
// Biases Whisper toward spelling brand and tech names correctly.
const VOCABULARY = 'OrbitDevStudio, Orbit AI, React, Next.js, Node.js, TypeScript, Tailwind, LiveKit, RAG, OpenAI, UI/UX, SaaS, e-commerce, HIPAA.';

const env = (name) => process.env[name]?.trim() || undefined;

function transcriptionUrl() {
  const chatUrl = env('GROQ_API_URL') || 'https://api.groq.com/openai/v1/chat/completions';
  return chatUrl.replace(/\/chat\/completions\/?$/, '/audio/transcriptions');
}

export async function POST(request) {
  const blocked = guard(request, { bucket: 'stt', limit: 15 });
  if (blocked) return blocked;

  const key = env('GROQ_API_KEY');
  if (!key) return json(503, { error: 'Voice input is not configured' });

  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  const ext = EXTENSIONS[type];
  if (!ext) return json(415, { error: 'Unsupported audio format' });

  const audio = await request.arrayBuffer();
  if (audio.byteLength < 1000) return json(400, { error: 'Recording too short' });
  if (audio.byteLength > MAX_BYTES) return json(413, { error: 'Recording too long' });

  const form = new FormData();
  form.append('file', new Blob([audio], { type }), `speech.${ext}`);
  form.append('model', env('GROQ_STT_MODEL') || 'whisper-large-v3-turbo');
  form.append('response_format', 'json');
  form.append('temperature', '0');
  form.append('prompt', VOCABULARY);

  try {
    const res = await fetch(transcriptionUrl(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      body: form,
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      console.error('[stt] groq failed:', res.status, (await res.text().catch(() => '')).slice(0, 200));
      return json(502, { error: 'Transcription failed' });
    }
    const data = await res.json();
    return json(200, { text: (data.text || '').trim() });
  } catch (error) {
    console.error('[stt] request error:', error);
    return json(502, { error: 'Transcription failed' });
  }
}
