import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/features/deploy/ui/DomainInputArea";
import DeployPreviewRenderer from "@/features/deploy/ui/DeployPreviewRenderer";
import DeployModal from "@/features/deploy/ui/DeployModal";
import { useDeploy } from "@/features/deploy/model/useDeploy";
import commonStyles from "@/shared/theme/commonStyles";
import { Mode } from "../../../app/MainContent";

interface DeploymentPanelProps {
  isRendered: boolean;
  deployMode: Mode;
  selectedBlocksHtml: { id: string; html: string }[];
  snapshotHtml: string | null;
  subdomain: string;
  setSubdomain: React.Dispatch<React.SetStateAction<string>>;
}

export default function DeploymentPanel({
  isRendered,
  deployMode,
  selectedBlocksHtml,
  snapshotHtml,
  subdomain,
  setSubdomain,
}: DeploymentPanelProps) {
  const {
    deploy,
    isDeploying,
    isModalOpen,
    modalMessage,
    statusCode,
    closeModal,
  } = useDeploy();

  const handleDeploy = () => {
    if (!subdomain.trim()) return;

    deploy({
      subdomain,
      deployMode,
      selectedBlocksHtml,
      snapshotHtml,
    });
  };

  return (
    <Box
      {...commonStyles.panelContainer}
      w={{ base: "90%", md: "80%", lg: "65%", xl: "30%" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50, width: 0 }}
        animate={
          isRendered
            ? { opacity: 1, x: 0, width: "100%" }
            : { opacity: 0, x: -50, width: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box display="flex" flexDirection="column" gap="4">
          <DomainInputArea
            subdomain={subdomain}
            setSubdomain={setSubdomain}
            handleDeploy={handleDeploy}
          />
          <DeployPreviewRenderer
            deployMode={deployMode}
            selectedBlocksHtml={selectedBlocksHtml}
          />
          <DeployModal
            isModalOpen={isModalOpen}
            modalMessage={modalMessage}
            statusCode={statusCode}
            closeModal={closeModal}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
