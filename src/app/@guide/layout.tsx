import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import ChakraLayout from "@/app/(providers)/ChakraLayout";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <ChakraLayout>
      <Box position="fixed" top="10px" right="2%" zIndex="10">
        {children}
      </Box>
    </ChakraLayout>
  );
}
