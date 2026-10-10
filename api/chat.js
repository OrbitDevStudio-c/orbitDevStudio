import { streamChat } from './_lib/llm.js';
import { SYSTEM_PROMPT } from './_lib/knowledge.js';
import { guard, json } from './_lib/guard.js';

const MAX_HISTORY = 12;
const MAX_CHARS = 2000;

function sanitize(messages) {
  if (!Array.isArray(messages)) return null;
  const clean = messages
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_HISTORY);
  return clean.length && clean[clean.length - 1].role === 'user' ? clean : null;
}

export async function POST(request) {
  const blocked = guard(request, { bucket: 'chat', limit: 20 });
  if (blocked) return blocked;

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const messages = sanitize(body?.messages);
  if (!messages) return json(400, { error: 'Invalid messages' });

  let result;
  try {
    result = await streamChat([{ role: 'system', content: SYSTEM_PROMPT }, ...messages]);
  } catch (error) {
    console.error('[ai] all providers failed:', error);
    return json(503, { error: 'Assistant temporarily unavailable' });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await result.stream.next();
        if (done) controller.close();
        else controller.enqueue(encoder.encode(value));
      } catch (error) {
        console.error(`[ai] ${result.provider} stream interrupted:`, error);
        controller.close();
      }
    },
    cancel() {
      result.stream.return?.();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-AI-Provider': result.provider,
    },
  });
}
