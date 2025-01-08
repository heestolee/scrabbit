"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Logo from "@/components/shared/Logo";
import ContentInteractionPanel from "@/components/panel/ContentInteractionPanel";
import DeploymentPanel from "@/components/panel/DeploymentPanel";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";

export default function MainContent() {
  const [deployMode, setDeployMode] = useState<"full" | "partial">("full");
  const [snapshotHtml, setSnapshotHtml] = useState<string | null>(null);
  const [selectedBlocksHtml, setSelectedBlocksHtml] = useState<
    { id: string; html: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  return (
    <ErrorBoundary>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bg="gray.100"
        justifyContent="center"
        minH="100vh"
      >
        <Logo isRendered={isRendered} />
        <Box
          display="flex"
          flexDirection="row"
          w="full"
          justifyContent="space-around"
          height="100%"
        >
          <ContentInteractionPanel
            deployMode={deployMode}
            setDeployMode={setDeployMode}
            snapshotHtml={snapshotHtml}
            selectedBlocksHtml={selectedBlocksHtml}
            setSelectedBlocksHtml={setSelectedBlocksHtml}
            setSnapshotHtml={setSnapshotHtml}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isRendered={isRendered}
            setIsRendered={setIsRendered}
          />
          {!isLoading && isRendered && (
            <DeploymentPanel
              isRendered={isRendered}
              deployMode={deployMode}
              selectedBlocksHtml={selectedBlocksHtml}
              snapshotHtml={snapshotHtml}
            />
          )}
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
