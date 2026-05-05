import { AI_PROVIDERS } from "./providers";

export type AIConfig = {
  providerId: string;
  modelId: string;
  apiKey: string;
};

export type AIAction =
  | "continue"
  | "rephrase"
  | "summarize"
  | "expand"
  | "shorten"
  | "fix_grammar"
  | "translate_en"
  | "translate_fa";

export const AI_ACTIONS: { id: AIAction; label: string; labelFa: string }[] = [
  { id: "continue", label: "Continue", labelFa: "ادامه بده" },
  { id: "rephrase", label: "Rephrase", labelFa: "بازنویسی" },
  { id: "summarize", label: "Summarize", labelFa: "خلاصه‌سازی" },
  { id: "expand", label: "Expand", labelFa: "گسترش" },
  { id: "shorten", label: "Shorten", labelFa: "کوتاه‌سازی" },
  { id: "fix_grammar", label: "Fix Grammar", labelFa: "ویرایش نگارشی" },
  { id: "translate_en", label: "Translate → EN", labelFa: "ترجمه به انگلیسی" },
  { id: "translate_fa", label: "Translate → FA", labelFa: "ترجمه به فارسی" },
];

const SYSTEM_PROMPTS: Record<AIAction, string> = {
  continue:
    "You are a writing assistant for academic papers and research. Continue the given text naturally, matching its language, style, and tone. Output only the continuation without any preamble or explanation.",
  rephrase:
    "You are a writing assistant. Rephrase the given text while preserving its full meaning. Output only the rephrased text.",
  summarize:
    "You are a writing assistant. Write a concise summary of the given text. Output only the summary.",
  expand:
    "You are a writing assistant for research and articles. Expand the given text with more detail, context, and depth. Output only the expanded text.",
  shorten:
    "You are a writing assistant. Shorten the given text while keeping all key points. Output only the shortened text.",
  fix_grammar:
    "You are a proofreader. Fix all grammar, spelling, and punctuation errors in the given text. Do not change the meaning. Output only the corrected text.",
  translate_en:
    "You are a professional translator. Translate the given text to English. Output only the translation.",
  translate_fa:
    "You are a professional translator. Translate the given text to Persian (Farsi). Output only the translation.",
};

// ─── OpenAI-compatible (OpenRouter, Groq, OpenAI) ───────────────────────────
async function callOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  modelId: string,
  systemPrompt: string,
  userText: string,
): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userText },
      ],
      max_tokens: 1500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API Error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

// ─── Google Gemini ───────────────────────────────────────────────────────────
async function callGemini(
  apiKey: string,
  modelId: string,
  systemPrompt: string,
  userText: string,
): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userText }] }],
        generationConfig: { maxOutputTokens: 1500 },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini Error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
}

// ─── Anthropic ───────────────────────────────────────────────────────────────
async function callAnthropic(
  apiKey: string,
  modelId: string,
  systemPrompt: string,
  userText: string,
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: modelId,
      system: systemPrompt,
      messages: [{ role: "user", content: userText }],
      max_tokens: 1500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic Error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? "";
}

// ─── Public entry point ──────────────────────────────────────────────────────
export async function runAIAction(
  config: AIConfig,
  action: AIAction,
  text: string,
): Promise<string> {
  const { providerId, modelId, apiKey } = config;

  if (!apiKey.trim())
    throw new Error("API key is not set. Please configure AI settings.");
  if (!text.trim()) throw new Error("The cell is empty.");

  const provider = AI_PROVIDERS.find((p) => p.id === providerId);
  if (!provider) throw new Error("Unknown provider.");

  const systemPrompt = SYSTEM_PROMPTS[action];

  switch (providerId) {
    case "gemini":
      return callGemini(apiKey, modelId, systemPrompt, text);
    case "anthropic":
      return callAnthropic(apiKey, modelId, systemPrompt, text);
    default:
      // openrouter / groq / openai — all OpenAI-compatible
      return callOpenAICompatible(
        provider.baseUrl,
        apiKey,
        modelId,
        systemPrompt,
        text,
      );
  }
}

// ─── Settings stored in localStorage ────────────────────────────────────────
const SETTINGS_KEY = "wordflow_ai_settings";

export type AISettings = {
  providerId: string;
  modelId: string;
  apiKey: string;
};

export function loadAISettings(): AISettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw) as AISettings;
  } catch {}
  return {
    providerId: "openrouter",
    modelId: "google/gemini-2.0-flash-exp:free",
    apiKey: "",
  };
}

export function saveAISettings(settings: AISettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
