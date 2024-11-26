"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export default function ChakraLayout({ children }) {
  return (
    <ChakraProvider>
      <ColorModeScript />
      {children}
    </ChakraProvider>
  );
}
