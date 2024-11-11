import { useState } from "react";
import { Box } from "@chakra-ui/react";
import DeployModeSelector from "@/components/DeployModeSelector";
import UrlInputArea from "@/components/UrlInputArea";
import LoadingAnimation from "@/components/LoadingAnimation";
import NotionPageRenderer from "@/components/NotionPageRenderer";
import { fetchNotionPage } from "@/actions/fetchNotionPage";

export default function ContentInteractionPanel({
  notionPageId,
  deployMode,
  setDeployMode,
  snapshotHtml,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
  setNotionPageId,
  setSnapshotHtml,
  isLoading,
  setIsLoading,
  setIsRendered,
}) {
  const [notionUrl, setNotionUrl] = useState("");

  const handleFetch = async () => {
    setIsLoading(true);
    setSnapshotHtml(null);

    const { pageId, snapshotHtml, error } = await fetchNotionPage(notionUrl);
    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    setNotionPageId(pageId);
    setSnapshotHtml(snapshotHtml);
    setIsLoading(false);
    setIsRendered(true);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" w="65%" h="100%">
      <Box
        display="flex"
        flexDirection={notionPageId ? "row" : "column"}
        alignItems={notionPageId ? "baseline" : "center"}
        justifyContent="space-between"
        w="100%"
      >
        <DeployModeSelector
          deployMode={deployMode}
          setDeployMode={setDeployMode}
        />
        <UrlInputArea
          deployMode={deployMode}
          notionUrl={notionUrl}
          setNotionUrl={setNotionUrl}
          handleFetch={handleFetch}
          isLoading={isLoading}
        />
      </Box>

      {(notionPageId || isLoading) && (
        <Box
          h="80vh"
          w="100%"
          mx="auto"
          bg="white"
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
            <NotionPageRenderer
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
