import React, { createContext, useContext, useEffect } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme: Theme = "dark";

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.add("dark");
    if (body) body.classList.add("dark");
    root.style.colorScheme = "dark";
    try {
      localStorage.setItem("cit_buildathon_theme", "dark");
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    // Fixed dark mode only
  };

  const setTheme = (_t: Theme) => {
    // Fixed dark mode only
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
