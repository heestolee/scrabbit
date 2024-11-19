"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Logo from "@/components/Logo";
import ContentInteractionPanel from "@/components/ContentInteractionPanel";
import DeploymentPanel from "@/components/DeploymentPanel";

export default function MainContent() {
  const [deployMode, setDeployMode] = useState("full");
  const [notionPageId, setNotionPageId] = useState(null);
  const [snapshotHtml, setSnapshotHtml] = useState(null);
  const [selectedBlocksHtml, setSelectedBlocksHtml] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.100"
      justifyContent={notionPageId ? "" : "center"}
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
          notionPageId={notionPageId}
          deployMode={deployMode}
          setDeployMode={setDeployMode}
          snapshotHtml={snapshotHtml}
          selectedBlocksHtml={selectedBlocksHtml}
          setSelectedBlocksHtml={setSelectedBlocksHtml}
          setNotionPageId={setNotionPageId}
          setSnapshotHtml={setSnapshotHtml}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsRendered={setIsRendered}
        />
        <DeploymentPanel
          isRendered={isRendered}
          deployMode={deployMode}
          notionPageId={notionPageId}
          selectedBlocksHtml={selectedBlocksHtml}
          snapshotHtml={snapshotHtml}
        />
      </Box>
    </Box>
  );
}
