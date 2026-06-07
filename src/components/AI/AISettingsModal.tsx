import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import MyModal from "../ui/MyModal";
import { AI_PROVIDERS } from "../../services/ai/providers";
import {
  loadAISettings,
  saveAISettings,
  type AISettings,
} from "../../services/ai/aiService";
import { useAIModal } from "../contexts/AIModal/AIModalContext";

export default function AISettingsModal() {
  const { t } = useTranslation();
  const { setOpenAISettingsModal } = useAIModal();
  const [settings, setSettings] = useState<AISettings>(loadAISettings);
  const [saved, setSaved] = useState(false);

  const selectedProvider =
    AI_PROVIDERS.find((p) => p.id === settings.providerId) ?? AI_PROVIDERS[0];

  const handleProviderChange = useCallback(
    (e: SelectChangeEvent<string>) => {
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
    (e: SelectChangeEvent<string>) => {
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

  // Native <select> renders with the OS theme inside Tauri's WebKitGTK webview,
  // so we use MUI Select (JS-rendered popup) to keep the app's dark theme.
  const muiSelectClass =
    "rounded-lg bg-white dark:bg-[#1e1f29] text-sm " +
    "[&_.MuiSelect-select]:py-2 [&_.MuiSelect-select]:text-gray-800 dark:[&_.MuiSelect-select]:text-gray-200! " +
    "[&_.MuiOutlinedInput-notchedOutline]:border-gray-200! dark:[&_.MuiOutlinedInput-notchedOutline]:border-gray-600! " +
    "[&_.MuiSvgIcon-root]:text-gray-400";

  const menuProps = {
    classes: {
      paper:
        "bg-white! dark:bg-context-dark! text-gray-800! dark:text-CellHeader-dark!",
    },
  };

  const selectClass =
    "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 " +
    "bg-white dark:bg-[#1e1f29] text-gray-800 dark:text-gray-200 " +
    "text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";

  return (
    <MyModal contentSize="md" onClose={handleClose}>
      <div className="p-6 space-y-5 min-w-[360px]">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {t("ai.settings")}
          </h2>
        </div>

        {/* Provider */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {t("ai.provider")}
          </label>
          <Select
            value={settings.providerId}
            onChange={handleProviderChange}
            size="small"
            fullWidth
            MenuProps={menuProps}
            className={muiSelectClass}
          >
            {AI_PROVIDERS.map((p) => (
              <MenuItem
                key={p.id}
                value={p.id}
                className="text-sm dark:text-gray-200! dark:hover:bg-hover-dark!"
              >
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Model */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {t("ai.model")}
          </label>
          <Select
            value={settings.modelId}
            onChange={handleModelChange}
            size="small"
            fullWidth
            MenuProps={menuProps}
            className={muiSelectClass}
          >
            {selectedProvider.models.map((m) => (
              <MenuItem
                key={m.id}
                value={m.id}
                className="text-sm dark:text-gray-200! dark:hover:bg-hover-dark!"
              >
                {m.name}
              </MenuItem>
            ))}
          </Select>
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
              {t("ai.getApiKey")}
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
          {saved ? t("ai.saved") : t("ai.save")}
        </button>

        {/* Info */}
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          {t("ai.info")}
        </p>
      </div>
    </MyModal>
  );
}
