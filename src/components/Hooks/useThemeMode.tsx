import { useEffect, useState, useCallback } from "react";

export default function useThemeMode() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const root = document.documentElement;
      if (prev) {
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  return { isDark, toggleTheme };
}
