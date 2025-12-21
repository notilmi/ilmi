"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="aspect-square size-10 p-2 hover:cursor-pointer transition-all ease-in-out"
    >
        {theme === "dark" ? (
            <MoonIcon className="h-4 w-4" />
        ) : (
            <SunIcon className="h-4 w-4" />
        )}
    </button>
  );
}
