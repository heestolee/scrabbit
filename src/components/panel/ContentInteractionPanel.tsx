import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Carousel from "@/components/carousel/Carousel";
import DeployModeSelector from "@/components/form/DeployModeSelector";
import UrlInputArea from "@/components/form/UrlInputArea";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
import FetchedPageRenderer from "@/components/renderer/FetchedPageRenderer";
import ErrorAlert from "@/components/error-boundary/ErrorAlert";
import { fetchPage } from "@/actions/fetchPage";
import { handleError } from "@/utils/errorHandler";
import commonStyles from "@/theme/commonStyles";

interface ContentInteractionPanelProps {
  deployMode: "full" | "partial";
  setDeployMode: (mode: "full" | "partial") => void;
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
  setSelectedBlocksHtml,
  setSnapshotHtml,
  isLoading,
  setIsLoading,
  isRendered,
  setIsRendered,
}: ContentInteractionPanelProps) {
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleFetch = async (sourceUrl: string) => {
    setIsLoading(true);
    setSnapshotHtml(null);

    try {
      const { snapshotHtml } = await fetchPage(sourceUrl);
      setSnapshotHtml(snapshotHtml);
      setIsRendered(true);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box {...commonStyles.panelContainer}>
      {error && (
        <ErrorAlert
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}
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
        maxH="80vh"
        w="100%"
        mt="4"
        bg="white"
        alignContent="center"
        overflowX="auto"
        overflowY="auto"
        sx={commonStyles.scrollBar}
        boxShadow="sm"
        borderRadius="md"
      >
        {!isLoading && !isRendered && <Carousel />}
        {isLoading && <LoadingAnimation />}
        {snapshotHtml && (
          <FetchedPageRenderer
            deployMode={deployMode}
            snapshotHtml={snapshotHtml}
            setSelectedBlocksHtml={setSelectedBlocksHtml}
          />
        )}
      </Box>
    </Box>
  );
}
