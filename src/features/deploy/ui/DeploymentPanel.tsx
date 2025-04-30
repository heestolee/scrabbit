import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/features/deploy/ui/DomainInputArea";
import DeployPreviewRenderer from "@/features/deploy/ui/DeployPreviewRenderer";
import DeployModal from "@/features/deploy/ui/DeployModal";
import { useDeploy } from "@/features/deploy/model/useDeploy";
import commonStyles from "@/shared/theme/commonStyles";
import { useDeployStore } from "@/features/deploy/model/useDeployStore";
import { useSnapshotStore } from "@/features/snapshot/model/useSnapshotStore";

interface DeploymentPanelProps {
  snapshotHtml: string;
}

export default function DeploymentPanel({
  snapshotHtml,
}: DeploymentPanelProps) {
  const { isRendered, subdomain, deployMode, updateSubdomain } =
    useDeployStore();
  const { selectedBlocksHtml } = useSnapshotStore();
  const { deploy, isDeploying, modal } = useDeploy();

  const handleDeploy = () => {
    if (!subdomain.trim() || isDeploying) return;

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
            onChangeSubdomain={updateSubdomain}
            onSubmit={handleDeploy}
            isLoading={isDeploying}
          />
          <DeployPreviewRenderer
            deployMode={deployMode}
            selectedBlocksHtml={selectedBlocksHtml}
          />
          <DeployModal
            isModalOpen={modal.isOpen}
            modalMessage={modal.message}
            statusCode={modal.statusCode}
            closeModal={modal.close}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
