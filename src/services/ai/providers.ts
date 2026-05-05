export type Model = {
  id: string;
  name: string;
};

export type Provider = {
  id: string;
  name: string;
  baseUrl: string;
  apiKeyLabel: string;
  apiKeyLink: string;
  models: Model[];
};

export const AI_PROVIDERS: Provider[] = [
  {
    id: "openrouter",
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKeyLabel: "OpenRouter API Key",
    apiKeyLink: "https://openrouter.ai/keys",
    models: [
      { id: "google/gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
      { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
      { id: "google/gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite Preview" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B" },
      { id: "openai/gpt-5.4", name: "GPT 5.4" },
      { id: "openai/gpt-5.4-nano", name: "GPT 5.4 Nano" },
      { id: "openai/gpt-5.4-mini", name: "GPT 5.4 Mini" },
      { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B (Free)" },
      { id: "openai/gpt-oss-20b", name: "GPT OSS 20B" },
      { id: "openai/gpt-5.1", name: "GPT 5.1" },
      { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7" },
      { id: "anthropic/claude-haiku-4.5", name: "Claude Haiku 4.5" },
      { id: "deepseek/deepseek-v3.2", name: "DeepSeek V3.2" },
      { id: "deepseek/deepseek-v4-flash", name: "DeepSeek V4 Flash" },
      { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
      { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "Nemotron 3 Super 120B (Free)" },
      { id: "minimax/minimax-m2.5:free", name: "Minimax M2.5 (Free)" },
      { id: "nvidia/nemotron-3-nano-30b-a3b:free", name: "Nemotron 3 Nano 30B (Free)" },
      { id: "z-ai/glm-4.5-air:free", name: "GLM 4.5 Air (Free)" },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    apiKeyLabel: "Groq API Key",
    apiKeyLink: "https://console.groq.com/keys",
    models: [
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B" },
      { id: "openai/gpt-oss-20b", name: "GPT OSS 20B" },
      { id: "qwen/qwen3-32b", name: "Qwen 3 32B" },
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B (Fast)" },
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B" },
      { id: "meta-llama/llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout 17B" },
      { id: "meta-llama/llama-prompt-guard-2-22m", name: "Llama Prompt Guard 2 22M" },
      { id: "meta-llama/llama-prompt-guard-2-86m", name: "Llama Prompt Guard 2 86M" },
    ],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    apiKeyLabel: "Google AI API Key",
    apiKeyLink: "https://aistudio.google.com/apikey",
    models: [
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "google/gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
      { id: "google/gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite Preview" },
      { id: "google/gemma-3-27b-it", name: "Gemma 3 27B IT" },
      { id: "google/gemma-3-12b-it", name: "Gemma 3 12B IT" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    apiKeyLabel: "Anthropic API Key",
    apiKeyLink: "https://console.anthropic.com/keys",
    models: [
      { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
      { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
      { id: "claude-3-7-sonnet-20250219", name: "Claude 3.7 Sonnet" },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
      { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    apiKeyLabel: "OpenAI API Key",
    apiKeyLink: "https://platform.openai.com/api-keys",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4.1", name: "GPT-4.1" },
      { id: "gpt-4.1-mini", name: "GPT-4.1 Mini" },
      { id: "o3-mini", name: "o3 Mini" },
      { id: "o4-mini", name: "o4 Mini" },
    ],
  },
];

export const DEFAULT_PROVIDER_ID = "openrouter";
