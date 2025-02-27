"use client";

import { ReactNode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import theme from "@/shared/theme";
import { queryClient } from "./QueryClient";

interface ChakraLayoutProps {
  children: ReactNode;
}

export default function ChakraLayout({ children }: ChakraLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
