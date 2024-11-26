import { useState } from "react";
import { Box } from "@chakra-ui/react";
import DeployModeSelector from "@/components/DeployModeSelector";
import UrlInputArea from "@/components/UrlInputArea";
import LoadingAnimation from "@/components/LoadingAnimation";
import FetchedPageRenderer from "@/components/FetchedPageRenderer";
import { fetchPage } from "@/actions/fetchPage";

export default function ContentInteractionPanel({
  pageId,
  deployMode,
  setDeployMode,
  snapshotHtml,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
  setPageId,
  setSnapshotHtml,
  isLoading,
  setIsLoading,
  setIsRendered,
}) {
  const [sourceUrl, setSourceUrl] = useState("");

  const handleFetch = async () => {
    setIsLoading(true);
    setSnapshotHtml(null);

    const { pageId, snapshotHtml, error } = await fetchPage(sourceUrl);
    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    setPageId(pageId);
    setSnapshotHtml(snapshotHtml);
    setIsLoading(false);
    setIsRendered(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="65%"
      h="100%"
    >
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
          deployMode={deployMode}
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
