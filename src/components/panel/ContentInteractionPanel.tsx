import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ExpansionCards from "@/components/expansion-cards/ExpansionCards";
import DeployModeSelector from "@/components/form/DeployModeSelector";
import UrlInputArea from "@/components/form/UrlInputArea";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
import FetchedPageRenderer from "@/components/renderer/FetchedPageRenderer";
import { fetchPage } from "@/actions/fetchPage";
import commonStyles from "@/theme/commonStyles";
import { Mode } from "../layout/MainContent";
import { useErrorToast } from "@/hooks/useErrorToast";

interface ContentInteractionPanelProps {
  deployMode: Mode;
  setDeployMode: (mode: Mode) => void;
  snapshotHtml: string | null;
  selectedBlocksHtml: { id: string; html: string }[];
  setSelectedBlocksHtml: React.Dispatch<
    React.SetStateAction<{ id: string; html: string }[]>
  >;
  setSnapshotHtml: (html: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isRendered: boolean;
  setIsRendered: (rendered: boolean) => void;
}

export default function ContentInteractionPanel({
  deployMode,
  setDeployMode,
  snapshotHtml,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
  setSnapshotHtml,
  isLoading,
  setIsLoading,
  isRendered,
  setIsRendered,
}: ContentInteractionPanelProps) {
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const showErrorToast = useErrorToast();

  const handleFetch = async (sourceUrl: string) => {
    setIsLoading(true);
    setSnapshotHtml(null);

    try {
      const { snapshotHtml } = await fetchPage(sourceUrl);
      setSnapshotHtml(snapshotHtml);
      setIsRendered(true);
    } catch (error) {
      showErrorToast("🚨 페이지 가져오기 실패", error);
    } finally {
      setIsLoading(false);
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
          isLoading={isLoading}
        />
      </Box>

      <Box
        minH="50vh"
        maxH="80vh"
        w="100%"
        mt="4"
        bg="white"
        alignContent="center"
        overflow="auto"
        sx={commonStyles.scrollBar}
        boxShadow="sm"
        borderRadius="md"
      >
        {isLoading ? (
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
