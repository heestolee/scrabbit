"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Logo from "@/components/shared/Logo";
import ContentInteractionPanel from "@/components/panel/ContentInteractionPanel";
import DeploymentPanel from "@/components/panel/DeploymentPanel";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";

export default function MainContent() {
  const [deployMode, setDeployMode] = useState<"full" | "partial">("full");
  const [pageId, setPageId] = useState<string | null>(null);
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
        justifyContent={pageId ? "flex-start" : "center"}
        minH="100vh"
      >
        <Logo isRendered={isRendered} isLoading={isLoading} />
        <Box
          display="flex"
          flexDirection="row"
          w="full"
          justifyContent="space-around"
          height="100%"
        >
          <ContentInteractionPanel
            pageId={pageId}
            deployMode={deployMode}
            setDeployMode={setDeployMode}
            snapshotHtml={snapshotHtml}
            selectedBlocksHtml={selectedBlocksHtml}
            setSelectedBlocksHtml={setSelectedBlocksHtml}
            setPageId={setPageId}
            setSnapshotHtml={setSnapshotHtml}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsRendered={setIsRendered}
          />
          {isRendered && <DeploymentPanel
            isRendered={isRendered}
            deployMode={deployMode}
            pageId={pageId}
            selectedBlocksHtml={selectedBlocksHtml}
            snapshotHtml={snapshotHtml}
          />}
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
