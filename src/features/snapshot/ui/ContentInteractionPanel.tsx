import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ExpansionCards from "@/entities/guide/ui/ExpansionCards";
import DeployModeSelector from "@/entities/deploy/ui/DeployModeSelector";
import UrlInputArea from "@/features/snapshot/ui/UrlInputArea";
import LoadingAnimation from "@/shared/ui/LoadingAnimation";
import FetchedPageRenderer from "@/features/snapshot/ui/FetchedPageRenderer";
import commonStyles from "@/shared/theme/commonStyles";
import { useDeployStore } from "@/features/deploy/model/useDeployStore";
import { useErrorToast } from "@/shared/hooks/useErrorToast";

interface ContentInteractionPanelProps {
  snapshotHtml: string | null;
  fetchSnapshot: (sourceUrl: string) => void;
  isSnapshotFetching: boolean;
}

export default function ContentInteractionPanel({
  snapshotHtml,
  fetchSnapshot,
  isSnapshotFetching,
}: ContentInteractionPanelProps) {
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const showErrorToast = useErrorToast();
  const { markAsRendered } = useDeployStore();

  const handleChangeSourceUrl = (value: string) => {
    setSourceUrl(value);
  };

  const handleSubmitUrl = async (url: string) => {
    try {
      fetchSnapshot(url);
      markAsRendered();
    } catch (error) {
      showErrorToast("🚨 페이지 가져오기 실패", error);
    }
  };

  return (
    <Box {...commonStyles.panelContainer}>
      <Box {...commonStyles.panelContent}>
        <DeployModeSelector />
        <UrlInputArea
          sourceUrl={sourceUrl}
          onChangeSourceUrl={handleChangeSourceUrl}
          onSubmitUrl={handleSubmitUrl}
          isLoading={isSnapshotFetching}
        />
      </Box>

      <Box
        minH={isSnapshotFetching || snapshotHtml ? "80vh" : "50vh"}
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
        {isSnapshotFetching ? (
          <LoadingAnimation />
        ) : snapshotHtml ? (
          <FetchedPageRenderer snapshotHtml={snapshotHtml} />
        ) : (
          <ExpansionCards />
        )}
      </Box>
    </Box>
  );
}
