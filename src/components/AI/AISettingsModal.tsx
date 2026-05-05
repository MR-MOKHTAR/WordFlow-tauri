import { useState, useCallback } from "react";
import MyModal from "../ui/MyModal";
import { AI_PROVIDERS } from "../../services/ai/providers";
import {
  loadAISettings,
  saveAISettings,
  type AISettings,
} from "../../services/ai/aiService";
import { useAIModal } from "../contexts/AIModal/AIModalContext";

export default function AISettingsModal() {
  const { setOpenAISettingsModal } = useAIModal();
  const [settings, setSettings] = useState<AISettings>(loadAISettings);
  const [saved, setSaved] = useState(false);

  const selectedProvider =
    AI_PROVIDERS.find((p) => p.id === settings.providerId) ?? AI_PROVIDERS[0];

  const handleProviderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newProvider =
        AI_PROVIDERS.find((p) => p.id === e.target.value) ?? AI_PROVIDERS[0];
      setSettings({
        providerId: newProvider.id,
        modelId: newProvider.models[0].id,
        apiKey: settings.apiKey,
      });
      setSaved(false);
    },
    [settings.apiKey],
  );

  const handleModelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSettings((prev) => ({ ...prev, modelId: e.target.value }));
      setSaved(false);
    },
    [],
  );

  const handleApiKeyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({ ...prev, apiKey: e.target.value }));
      setSaved(false);
    },
    [],
  );

  const handleSave = useCallback(() => {
    saveAISettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [settings]);

  const handleClose = useCallback(
    () => setOpenAISettingsModal(false),
    [setOpenAISettingsModal],
  );

  const selectClass =
    "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 " +
    "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 " +
    "text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";

  return (
    <MyModal contentSize="md" onClose={handleClose}>
      <div className="p-6 space-y-5 min-w-[360px]">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            AI Settings
          </h2>
        </div>

        {/* Provider */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Provider
          </label>
          <select
            value={settings.providerId}
            onChange={handleProviderChange}
            className={selectClass}
          >
            {AI_PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Model
          </label>
          <select
            value={settings.modelId}
            onChange={handleModelChange}
            className={selectClass}
          >
            {selectedProvider.models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* API Key */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {selectedProvider.apiKeyLabel}
            </label>
            <a
              href={selectedProvider.apiKeyLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
            >
              Get API Key ↗
            </a>
          </div>
          <input
            type="password"
            value={settings.apiKey}
            onChange={handleApiKeyChange}
            placeholder="sk-..."
            className={selectClass}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={
            "w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 " +
            (saved
              ? "bg-green-500 text-white"
              : "bg-violet-600 hover:bg-violet-700 text-white active:scale-95")
          }
        >
          {saved ? "✓ Saved!" : "Save Settings"}
        </button>

        {/* Info */}
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          API keys are stored locally on your device only
        </p>
      </div>
    </MyModal>
  );
}
