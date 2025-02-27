"use client";

import { useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Logo from "@/shared/ui/Logo";
import ContentInteractionPanel from "@/features/snapshot/ui/ContentInteractionPanel";
import DeploymentPanel from "@/features/deploy/ui/DeploymentPanel";
import { useSnapshotData } from "@/features/snapshot/model/useSnapshotData";

export type Mode = "full" | "partial";

export default function MainContent() {
  const [deployMode, setDeployMode] = useState<Mode>("full");
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [subdomain, setSubdomain] = useState<string>("");
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1280px)");
  const router = useRouter();

  const {
    snapshotHtml,
    selectedBlocksHtml,
    setSelectedBlocksHtml,
    fetchSnapshot,
    isFetching,
  } = useSnapshotData();

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
          fetchSnapshot={fetchSnapshot}
          isFetching={isFetching}
          setIsRendered={setIsRendered}
        />
        {isRendered && snapshotHtml && (
          <DeploymentPanel
            isRendered={isRendered}
            deployMode={deployMode}
            selectedBlocksHtml={selectedBlocksHtml}
            snapshotHtml={snapshotHtml}
            subdomain={subdomain}
            setSubdomain={setSubdomain}
          />
        )}
      </Box>
    </Box>
  );
}
