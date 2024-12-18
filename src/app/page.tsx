import React, { Suspense } from "react";
import ChakraLayout from "@/components/layout/ChakraLayout";
import MainContent from "@/components/layout/MainContent";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";

export default function Home(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <ChakraLayout>
        <Suspense fallback={<p>Loading...</p>}>
          <MainContent />
        </Suspense>
      </ChakraLayout>
    </ErrorBoundary>
  );
}
