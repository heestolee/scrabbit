import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import ChakraLayout from "@/components/layout/ChakraLayout";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <ChakraLayout>
      <Box position="fixed" top="20px" right="20px" zIndex="10">
        {children}
      </Box>
    </ChakraLayout>
  );
}
