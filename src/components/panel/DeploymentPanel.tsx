"use client";

import { useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/components/form/DomainInputArea";
import DeployPreviewRenderer from "@/components/renderer/DeployPreviewRenderer";
import DeployModal from "@/components/modal/DeployModal";
import ErrorAlert from "@/components/error-boundary/ErrorAlert";
import { deployPage } from "@/actions/deployPage";
import { handleError } from "@/utils/errorHandler";
import commonStyles from "@/theme/commonStyles";

interface DeploymentPanelProps {
  isRendered: boolean;
  deployMode: "full" | "partial";
  selectedBlocksHtml: { id: string; html: string }[];
  snapshotHtml: string | null;
}

export default function DeploymentPanel({
  isRendered,
  deployMode,
  selectedBlocksHtml,
  snapshotHtml,
}: DeploymentPanelProps) {
  const [subdomain, setSubdomain] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleDeploy = async () => {
    try {
      const { url } = await deployPage({
        subdomain,
        deployMode,
        selectedBlocksHtml,
        snapshotHtml,
      });

      setModalMessage(`배포된 사이트: ${url}`);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      {...commonStyles.panelContainer}
      w={{ base: "90%", md: "80%", lg: "65%", xl: "30%" }}
    >
      {error && (
        <ErrorAlert
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}
      <motion.div
        initial={{ opacity: 0, x: -50, width: 0 }}
        animate={
          isRendered
            ? { opacity: 1, x: 0, width: "100%" }
            : { opacity: 0, x: -50, width: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
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
            closeModal={closeModal}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
