import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");
  const isLight = theme === "light" || (theme === "system" && systemTheme === "light");
  const isSystem = theme === "system";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    theme,
    setTheme,
    systemTheme,
    isDark,
    isLight,
    isSystem,
    toggleTheme,
  };
}
