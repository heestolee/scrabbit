import React from "react";
import { Button } from "@chakra-ui/react";

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
  colorScheme: string;
  width?: string | object;
}

export default function SubmitButton({
  label,
  isLoading = false,
  colorScheme,
  width = "20%",
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      colorScheme={colorScheme}
      isLoading={isLoading}
      width={width}
      borderRadius="md"
      _hover={{ bg: `${colorScheme}.400` }}
      boxShadow="md"
    >
      {label}
    </Button>
  );
}
