import React, { Suspense } from "react";
import ChakraLayout from "@/app/(providers)/ChakraLayout";
import MainContent from "@/app/MainContent";

export default function Home(): React.JSX.Element {
  return (
    <ChakraLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <MainContent />
      </Suspense>
    </ChakraLayout>
  );
}
