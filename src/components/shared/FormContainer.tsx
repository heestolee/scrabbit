import React from "react";
import { Box } from "@chakra-ui/react";

interface FormContainerProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function FormContainer({ onSubmit, children }: FormContainerProps) {
  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py={4}
      gap={3}
      w="100%"
    >
      {children}
    </Box>
  );
}
