"use client"
import { PaletteMode, ThemeProvider, createTheme, useMediaQuery } from "@mui/material"
import { useAppSelector } from "../hooks/ReduxHooks";
import { UseActions } from "../hooks/UseActions";
import { useLayoutEffect } from "react";

export default function MyThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useAppSelector(state => state.theme);
  const { changeTheme } = UseActions();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useLayoutEffect(() => {
    changeTheme(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode])

  const darkTheme = createTheme({
    palette: {
      mode: theme ? theme as PaletteMode : prefersDarkMode ? "dark" : "light"
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: theme === "dark" ? "#fff" : theme === "light"? "#1A202E" : prefersDarkMode ? "#fff" : "#1A202E"
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  )
}
