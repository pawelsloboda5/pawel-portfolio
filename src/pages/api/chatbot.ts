import type { APIRoute } from 'astro';
import { experiences } from '../../data/experiences';
import { featuredProjects } from '../../data/featuredProjects';
import { otherProjects } from '../../data/otherProjects';
import { socialLinks } from '../../data/links';

export const prerender = false;

interface ClientMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

function buildContext() {
  return {
    meta: {
      name: 'Pawel Sloboda',
      purpose: 'Portfolio AI assistant for answering questions about Pawel\'s work, projects, and skills.',
      version: 1
    },
    contact: {
      email: socialLinks.email.replace('mailto:', ''),
      linkedin: socialLinks.linkedin,
      github: socialLinks.github,
      resume: socialLinks.resume
    },
    experiences,
    featuredProjects,
    otherProjects
  };
}

function toOpenAIHistory(history: ClientMessage[]) {
  const safe = Array.isArray(history) ? history.slice(-12) : [];
  return safe.map((m) => ({
    role: m.role === 'bot' ? 'assistant' : 'user',
    content: [{ type: m.role === 'bot' ? 'output_text' : 'input_text', text: m.content }]
  }));
}

function getApiKey(): string | undefined {
  // Prefer runtime env (Vercel) with fallback to build-time env (local dev)
  return process.env.OPENAI_API_KEY || (import.meta as any).env?.OPENAI_API_KEY;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing OPENAI_API_KEY on server' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const userMessage: string = (body?.message ?? '').toString().slice(0, 1000);
    const history: ClientMessage[] = Array.isArray(body?.history) ? body.history : [];
    const contextOverride = body?.context;

    if (!userMessage || userMessage.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message required' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    const context = contextOverride || buildContext();

    const systemPrompt = [
      "You are Pawel's helpful portfolio assistant.",
      'Use ONLY the provided experiences and projects context to answer accurately.',
      'Linking rule: when you mention a project or resource with a URL, include the full https link as plain text (no markdown) so the client underlines it and makes it clickable.',
      'Conversation policy:',
      '- By default focus on ONE item only: either a single project OR a single experience (whichever best matches the question). Provide 2–4 concise sentences and include exactly one relevant link if available.',
      "- If the user asks generally about 'projects' or 'experience', give a short sampler: up to three one-line bullets (each with a plain https link when available), then ask the user to pick one for a deeper dive.",
      "- If the user explicitly asks for multiple, provide brief one-liners as above and ask which to expand next.",
      "- If the user asks for both projects AND experience, include one project and one experience (1–2 lines each) and then ask what to expand next.",
      'Always end your reply with a short follow-up question inviting the user to continue.'
    ].join(' ');

    const input = [
      { role: 'system', content: [
        { type: 'input_text', text: systemPrompt },
        { type: 'input_text', text: JSON.stringify(context) }
      ]},
      ...toOpenAIHistory(history),
      { role: 'user', content: [{ type: 'input_text', text: userMessage }] }
    ];

    const resp = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input,
        max_output_tokens: 500
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return new Response(
        JSON.stringify({ error: 'OpenAI API error', detail: errText }),
        { status: 502, headers: { 'content-type': 'application/json' } }
      );
    }

    const data = await resp.json();

    // Responses API common shapes
    let outputText = (data && (data.output_text || data?.response?.output_text)) ?? '';
    if (!outputText) {
      try {
        // Fallback to nested extraction
        const first = data?.output?.[0]?.content?.[0]?.text
          || data?.response?.output?.[0]?.content?.[0]?.text
          || '';
        outputText = first || '';
      } catch {
        outputText = '';
      }
    }

    if (!outputText || typeof outputText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Empty response from model' }),
        { status: 502, headers: { 'content-type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ text: outputText }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Unexpected server error', detail: String(err?.message || err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};


