"use client";

import { ReactNode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

interface ChakraLayoutProps {
  children: ReactNode;
}

export default function ChakraLayout({ children }: ChakraLayoutProps) {
  return (
    <ChakraProvider>
      <ColorModeScript />
      {children}
    </ChakraProvider>
  );
}
