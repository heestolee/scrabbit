"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from "@chakra-ui/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: { title: string; description: string } | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: {
        title: "에러 발생",
        description: error.message || "알 수 없는 오류가 발생했습니다.",
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box maxW="md" mx="auto" mt="10">
          <Alert status="error" variant="subtle" flexDirection="column" textAlign="center">
            <AlertIcon />
            <AlertTitle>{this.state.error?.title || "알 수 없는 오류"}</AlertTitle>
            <AlertDescription>{this.state.error?.description}</AlertDescription>
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
