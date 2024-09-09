'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; 


const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button onClick={handleTheme}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );  
}

export default ThemeSwitcher;