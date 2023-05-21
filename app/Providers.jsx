"use client";

import { MantineProvider } from "@mantine/core";

export function Providers({ children }) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "__Poppins_3bfef9, __Poppins_Fallback_3bfef9",
      }}
    >
      {children}
    </MantineProvider>
  );
}
