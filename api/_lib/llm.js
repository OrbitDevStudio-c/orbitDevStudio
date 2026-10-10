const FIRST_TOKEN_TIMEOUT_MS = 20_000;
const TOTAL_TIMEOUT_MS = 60_000;
const SHORT_COOLDOWN_MS = 5 * 60_000;
const LONG_COOLDOWN_MS = 30 * 60_000;

// Per warm instance: a provider that just failed is tried last until its cooldown expires.
const cooldownUntil = new Map();

const env = (name) => process.env[name]?.trim() || undefined;

class ProviderError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function getProviders() {
  const groqUrl = env('GROQ_API_URL') || 'https://api.groq.com/openai/v1/chat/completions';
  const groqAccurate = env('GROQ_API_MODEL_ACCURATE');
  const groqFast = env('GROQ_API_MODEL_FAST');

  const providers = [
    {
      id: 'openrouter',
      url: 'https://openrouter.ai/api/v1/chat/completions',
      key: env('OPENROUTER_API_KEY'),
      model: env('OPENROUTER_CHAT_MODEL') || 'openai/gpt-4o-mini',
      headers: { 'HTTP-Referer': 'https://orbit-dev-studio.vercel.app', 'X-Title': 'OrbitDevStudio' },
    },
    { id: 'groq', url: groqUrl, key: env('GROQ_API_KEY'), model: groqAccurate || groqFast },
  ];
  if (groqFast && groqAccurate && groqFast !== groqAccurate) {
    providers.push({ id: 'groq-fast', url: groqUrl, key: env('GROQ_API_KEY'), model: groqFast });
  }
  return providers.filter((p) => p.key && p.model);
}

function orderByHealth(providers) {
  const now = Date.now();
  const healthy = providers.filter((p) => (cooldownUntil.get(p.id) ?? 0) <= now);
  const cooling = providers.filter((p) => (cooldownUntil.get(p.id) ?? 0) > now);
  return [...healthy, ...cooling];
}

function markFailed(provider, error) {
  const authOrBilling = [401, 402, 403].includes(error?.status);
  cooldownUntil.set(provider.id, Date.now() + (authOrBilling ? LONG_COOLDOWN_MS : SHORT_COOLDOWN_MS));
  console.warn(`[ai] ${provider.id} (${provider.model}) failed: ${error?.message ?? error}`);
}

async function* streamFromProvider(provider, messages, signal) {
  const body = {
    model: provider.model,
    messages,
    stream: true,
    temperature: 0.3,
    max_tokens: 1024,
  };
  if (provider.model.includes('gpt-oss') && provider.id.startsWith('groq')) {
    body.reasoning_effort = 'low';
  }

  const res = await fetch(provider.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.key}`,
      ...provider.headers,
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '');
    throw new ProviderError(`HTTP ${res.status} ${detail.slice(0, 200)}`, res.status);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const raw of lines) {
      const line = raw.trim();
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') return;

      let json;
      try {
        json = JSON.parse(data);
      } catch {
        continue;
      }
      if (json.error) throw new ProviderError(json.error.message || 'Stream error', json.error.code);
      const text = json.choices?.[0]?.delta?.content;
      if (text) yield text;
    }
  }
}

/**
 * Streams a chat completion from the first provider that produces output.
 * Fallback happens before the first token, so the user never sees a half answer from a dead provider.
 */
export async function streamChat(messages) {
  const providers = orderByHealth(getProviders());
  if (providers.length === 0) throw new Error('No AI provider is configured');

  for (const provider of providers) {
    const controller = new AbortController();
    const firstTokenTimer = setTimeout(() => controller.abort(new Error('first token timeout')), FIRST_TOKEN_TIMEOUT_MS);
    const totalTimer = setTimeout(() => controller.abort(new Error('total timeout')), TOTAL_TIMEOUT_MS);
    const cleanup = () => {
      clearTimeout(firstTokenTimer);
      clearTimeout(totalTimer);
    };

    const gen = streamFromProvider(provider, messages, controller.signal);
    let first;
    try {
      first = await gen.next();
    } catch (error) {
      cleanup();
      markFailed(provider, controller.signal.aborted ? controller.signal.reason : error);
      continue;
    }
    clearTimeout(firstTokenTimer);

    if (first.done) {
      cleanup();
      markFailed(provider, new Error('empty response'));
      continue;
    }

    cooldownUntil.delete(provider.id);
    const rest = (async function* () {
      try {
        yield first.value;
        yield* gen;
      } finally {
        cleanup();
      }
    })();
    return { provider: provider.id, stream: rest };
  }

  throw new Error('All AI providers failed');
}

/** Non-streaming variant built on the same provider fallback chain. */
export async function completeChat(messages) {
  const { provider, stream } = await streamChat(messages);
  let text = '';
  for await (const chunk of stream) text += chunk;
  return { provider, text };
}
