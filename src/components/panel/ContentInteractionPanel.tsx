import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import DeployModeSelector from "@/components/form/DeployModeSelector";
import UrlInputArea from "@/components/form/UrlInputArea";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
import FetchedPageRenderer from "@/components/renderer/FetchedPageRenderer";
import ErrorAlert from "@/components/error-boundary/ErrorAlert";
import { fetchPage } from "@/actions/fetchPage";
import { handleError } from "@/utils/errorHandler";

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
  setIsRendered,
}: ContentInteractionPanelProps) {
  const [pageId, setPageId] = useState<string | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleFetch = async () => {
    setIsLoading(true);
    setSnapshotHtml(null);

    try {
      const { pageId, snapshotHtml } = await fetchPage(sourceUrl);
      setPageId(pageId);
      setSnapshotHtml(snapshotHtml);
      setIsRendered(true);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="65%"
      h="100%"
    >
      {error && (
        <ErrorAlert
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}
      <Box
        display="flex"
        flexDirection={pageId ? "row" : "column"}
        alignItems={pageId ? "baseline" : "center"}
        justifyContent="space-between"
        w="100%"
      >
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

      {(pageId || isLoading) && (
        <Box
          h="80vh"
          w="100%"
          mx="auto"
          bg="white"
          alignContent="center"
          overflowY="auto"
          overflowX="hidden"
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.625rem",
              padding: "0.625rem",
              margin: "0.625rem",
            },
            "&::-webkit-scrollbar-track": {
              background: "var(--chakra-colors-gray-400)",
              borderRadius: "0.625rem",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--chakra-colors-purple-300)",
              borderRadius: "0.625rem",
            },
          }}
        >
          {isLoading && <LoadingAnimation />}
          {snapshotHtml && (
            <FetchedPageRenderer
              deployMode={deployMode}
              snapshotHtml={snapshotHtml}
              selectedBlocksHtml={selectedBlocksHtml}
              setSelectedBlocksHtml={setSelectedBlocksHtml}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
