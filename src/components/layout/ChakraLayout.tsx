"use client";

import { ReactNode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

interface ChakraLayoutProps {
  children: ReactNode;
}

export default function ChakraLayout({ children }: ChakraLayoutProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      {children}
    </ChakraProvider>
  );
}
