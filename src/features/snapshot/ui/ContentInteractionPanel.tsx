import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ExpansionCards from "@/entities/guide/ui/ExpansionCards";
import DeployModeSelector from "@/entities/deploy/ui/DeployModeSelector";
import UrlInputArea from "@/features/snapshot/ui/UrlInputArea";
import LoadingAnimation from "@/shared/ui/LoadingAnimation";
import FetchedPageRenderer from "@/features/snapshot/ui/FetchedPageRenderer";
import commonStyles from "@/shared/theme/commonStyles";
import { Mode } from "../../../app/MainContent";
import { useErrorToast } from "@/shared/hooks/useErrorToast";

interface ContentInteractionPanelProps {
  deployMode: Mode;
  setDeployMode: (mode: Mode) => void;
  snapshotHtml: string | null;
  selectedBlocksHtml: { id: string; html: string }[];
  setSelectedBlocksHtml: React.Dispatch<
    React.SetStateAction<{ id: string; html: string }[]>
  >;
  fetchSnapshot: (sourceUrl: string) => void;
  isFetching: boolean;
  setIsRendered: (rendered: boolean) => void;
}

export default function ContentInteractionPanel({
  deployMode,
  setDeployMode,
  snapshotHtml,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
  fetchSnapshot,
  isFetching,
  setIsRendered,
}: ContentInteractionPanelProps) {
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const showErrorToast = useErrorToast();

  const handleFetch = async (sourceUrl: string): Promise<void> => {
    try {
      fetchSnapshot(sourceUrl);
      setIsRendered(true);
    } catch (error) {
      showErrorToast("🚨 페이지 가져오기 실패", error);
    }
  };

  return (
    <Box {...commonStyles.panelContainer}>
      <Box {...commonStyles.panelContent}>
        <DeployModeSelector
          deployMode={deployMode}
          setDeployMode={setDeployMode}
        />
        <UrlInputArea
          sourceUrl={sourceUrl}
          setSourceUrl={setSourceUrl}
          handleFetch={handleFetch}
          isLoading={isFetching}
        />
      </Box>

      <Box
        minH={isFetching || snapshotHtml ? "80vh" : "50vh"}
        maxH="80vh"
        w="100%"
        mt="4"
        bg="white"
        alignContent="center"
        overflow="auto"
        sx={snapshotHtml ? commonStyles.scrollBar : ""}
        boxShadow="sm"
        borderRadius="md"
      >
        {isFetching ? (
          <LoadingAnimation />
        ) : snapshotHtml ? (
          <FetchedPageRenderer
            deployMode={deployMode}
            snapshotHtml={snapshotHtml}
            selectedBlocksHtml={selectedBlocksHtml}
            setSelectedBlocksHtml={setSelectedBlocksHtml}
          />
        ) : (
          <ExpansionCards />
        )}
      </Box>
    </Box>
  );
}
