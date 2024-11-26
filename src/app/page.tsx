import { Suspense } from "react";
import ChakraLayout from "@/components/ChakraLayout";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <ChakraLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <MainContent />
      </Suspense>
    </ChakraLayout>
  );
}
