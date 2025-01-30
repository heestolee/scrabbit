"use client";

import { useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import ContentInteractionPanel from "@/components/panel/ContentInteractionPanel";
import DeploymentPanel from "@/components/panel/DeploymentPanel";

export type Mode = "full" | "partial";

export default function MainContent() {
  const [deployMode, setDeployMode] = useState<Mode>("full");
  const [snapshotHtml, setSnapshotHtml] = useState<string | null>(null);
  const [selectedBlocksHtml, setSelectedBlocksHtml] = useState<
    { id: string; html: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1280px)");
  const router = useRouter();

  const resetPage = () => {
    setSnapshotHtml(null);
    setSelectedBlocksHtml([]);
    setIsRendered(false);
    router.replace("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.100"
      justifyContent="center"
      minH="100vh"
    >
      <Logo isRendered={isRendered} onClick={resetPage} />
      <Box
        display="flex"
        flexDirection={isTabletOrMobile ? "column" : "row"}
        w="full"
        justifyContent="center"
        alignItems="center"
        height="100%"
        gap="20px"
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
        {isRendered && (
          <DeploymentPanel
            isRendered={isRendered}
            deployMode={deployMode}
            selectedBlocksHtml={selectedBlocksHtml}
            snapshotHtml={snapshotHtml}
          />
        )}
      </Box>
    </Box>
  );
}
