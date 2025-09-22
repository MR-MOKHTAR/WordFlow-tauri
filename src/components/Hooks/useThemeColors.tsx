import { useMemo } from "react";
import { draculaTheme } from "../colors";

export default function useThemeColors(darkMode: boolean) {
  const theme = useMemo(() => {
    return darkMode ? draculaTheme.dark : draculaTheme.light;
  }, [darkMode]);
  return theme;
}
