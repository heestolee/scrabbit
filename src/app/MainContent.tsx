"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Logo from "@/shared/ui/Logo";
import ContentInteractionPanel from "@/features/snapshot/ui/ContentInteractionPanel";
import DeploymentPanel from "@/features/deploy/ui/DeploymentPanel";
import { useSnapshotData } from "@/features/snapshot/model/useSnapshotData";
import { useDeployStore } from "@/features/deploy/model/store";
import { useSnapshotStore } from "@/features/snapshot/model/store";

export default function MainContent() {
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1280px)");
  const router = useRouter();
  const { isRendered, resetDeployState } = useDeployStore();
  const { resetSelectedBlocks } = useSnapshotStore();
  const { snapshotHtml, fetchSnapshot, isSnapshotFetching } = useSnapshotData();

  const resetPage = () => {
    resetDeployState();
    resetSelectedBlocks();
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
          snapshotHtml={snapshotHtml}
          fetchSnapshot={fetchSnapshot}
          isSnapshotFetching={isSnapshotFetching}
        />
        {isRendered && snapshotHtml && (
          <DeploymentPanel snapshotHtml={snapshotHtml} />
        )}
      </Box>
    </Box>
  );
}
