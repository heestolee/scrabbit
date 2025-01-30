import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();

  return (title: string, error: unknown) => {
    toast({
      title,
      description:
        error instanceof Error
          ? error.message
          : "예기치 못한 오류가 발생했습니다.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
      variant: "left-accent",
    });
  };
};
