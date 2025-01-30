import React, { Suspense } from "react";
import ChakraLayout from "@/components/layout/ChakraLayout";
import MainContent from "@/components/layout/MainContent";

export default function Home(): React.JSX.Element {
  return (
    <ChakraLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <MainContent />
      </Suspense>
    </ChakraLayout>
  );
}
