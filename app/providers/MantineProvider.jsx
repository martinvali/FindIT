"use client";

import { MantineProvider } from "@mantine/core";

export function Mantine_Provider({ children }) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "__Poppins_3bfef9, __Poppins_Fallback_3bfef9",
        colorScheme: "light",
      }}
    >
      {children}
    </MantineProvider>
  );
}
