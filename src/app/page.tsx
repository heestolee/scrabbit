import { Suspense } from "react";
import ChakraLayout from "@/components/ChakraLayout";
import MainContent from "@/components/MainContent";
import ErrorBoundary from "@/components/ErrorBoundary";

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
