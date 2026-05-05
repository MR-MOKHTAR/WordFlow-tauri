import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type AIModalContextType = {
  openAISettingsModal: boolean;
  setOpenAISettingsModal: (val: boolean) => void;
};

const AIModalContext = createContext<AIModalContextType | null>(null);

export function AIModalProvider({ children }: { children: ReactNode }) {
  const [openAISettingsModal, setOpenAISettingsModal] = useState(false);

  const setOpen = useCallback((val: boolean) => {
    setOpenAISettingsModal(val);
  }, []);

  return (
    <AIModalContext.Provider
      value={{ openAISettingsModal, setOpenAISettingsModal: setOpen }}
    >
      {children}
    </AIModalContext.Provider>
  );
}

export function useAIModal() {
  const ctx = useContext(AIModalContext);
  if (!ctx) throw new Error("useAIModal must be used inside AIModalProvider");
  return ctx;
}
