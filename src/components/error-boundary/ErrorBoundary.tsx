"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import ErrorAlert from "@/components/error-boundary/ErrorAlert";

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
          <ErrorAlert
            title={this.state.error?.title || "알 수 없는 오류"}
            description={this.state.error?.description || ""}
            onClose={() => this.setState({ hasError: false, error: null })}
          />
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
