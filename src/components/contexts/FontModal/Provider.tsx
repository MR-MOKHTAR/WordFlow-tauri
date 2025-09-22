import { memo, ReactNode, useEffect, useMemo, useState } from "react";
import { FontModalContext } from "../contexts";

type FontContextProps = {
  children: ReactNode;
};

function FontProvider({ children }: FontContextProps) {
  const [openFontModal, setOpenFontModal] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("fontSize") || "16";
  });
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem("fontFamily") || "Vazir";
  });

  const contextValue = useMemo(
    () => ({
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      openFontModal,
      setOpenFontModal,
    }),
    [
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      openFontModal,
      setOpenFontModal,
    ]
  );

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("fontFamily", fontFamily.toString());
  }, [fontFamily]);

  return (
    <FontModalContext.Provider value={contextValue}>
      {children}
    </FontModalContext.Provider>
  );
}

export default memo(FontProvider);
