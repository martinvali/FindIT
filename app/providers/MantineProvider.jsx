"use client";

import { MantineProvider, createTheme } from "@mantine/core";

export function Mantine_Provider({ children }) {
  const theme = createTheme({
    fontFamily: "__Poppins_3bfef9, __Poppins_Fallback_3bfef9",
    colors: {
      brand: [
        "#ecfeff",
        "#cffafe",
        "#a5f3fc",
        "#67e8f9",
        "#22d3ee",
        "#06b6d4",
        "#0891b2",
        "#0e7490",
        "#155e75",
        "#164e63",
        "#083344",
      ],
    },
    primaryColor: "brand",
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
