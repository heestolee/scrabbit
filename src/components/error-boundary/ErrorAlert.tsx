import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  title: string;
  description: string;
  onClose: () => void;
}

export default function ErrorAlert({
  title,
  description,
  onClose,
}: ErrorAlertProps) {
  return (
    <Alert status="error" mb={4}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton onClick={onClose} />
    </Alert>
  );
}
