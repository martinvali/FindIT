"use client";

import { MantineProvider, createTheme } from "@mantine/core";

export function Mantine_Provider({ children }) {
  const theme = createTheme({
    fontFamily: "__Poppins_3bfef9, __Poppins_Fallback_3bfef9",
    primaryColor: "cyan",
  });
  return (
    <MantineProvider
      theme={{
        theme,
      }}
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
}
