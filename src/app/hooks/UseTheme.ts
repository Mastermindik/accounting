"use client"
import { useLayoutEffect, useState } from "react";
import { UseActions } from "./UseActions";

export const useTheme = () => {
  const { changeTheme } = UseActions();
  
  let savedTheme: string | null = "";

  if (typeof window !== 'undefined') {
    savedTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "";
  }
  
  const [theme, setTheme] = useState<string | null>(
    savedTheme ? savedTheme : ""
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme ? theme : "");
    localStorage.setItem("theme", theme as string)
    changeTheme(theme);
  }, [theme, savedTheme])

  return { theme, setTheme };
}