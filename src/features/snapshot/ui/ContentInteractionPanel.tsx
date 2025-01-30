import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ExpansionCards from "@/entities/guide/ui/ExpansionCards";
import DeployModeSelector from "@/entities/deploy/ui/DeployModeSelector";
import UrlInputArea from "@/features/snapshot/ui/UrlInputArea";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
import FetchedPageRenderer from "@/features/snapshot/ui/FetchedPageRenderer";
import { fetchPage } from "@/features/snapshot/api/fetchPage";
import commonStyles from "@/theme/commonStyles";
import { Mode } from "../../../app/MainContent";
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
        minH={isLoading || isRendered ? "80vh" : "50vh"}
        maxH="80vh"
        w="100%"
        mt="4"
        bg="white"
        alignContent="center"
        overflow="auto"
        sx={isRendered ? commonStyles.scrollBar : ""}
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
