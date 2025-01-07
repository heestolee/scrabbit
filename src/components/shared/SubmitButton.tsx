import React from "react";
import { Button } from "@chakra-ui/react";

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
  colorScheme: string;
  width?: string | object;
  minWidth?: string;
}

export default function SubmitButton({
  label,
  isLoading = false,
  colorScheme,
  width = "20%",
  minWidth,
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
      minWidth={minWidth}
    >
      {label}
    </Button>
  );
}
