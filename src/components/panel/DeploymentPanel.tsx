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

interface DeploymentPanelProps {
  isRendered: boolean;
  deployMode: "full" | "partial";
  pageId: string | null;
  selectedBlocksHtml: { id: string; html: string }[];
  snapshotHtml: string | null;
}

export default function DeploymentPanel({
  isRendered,
  deployMode,
  pageId,
  selectedBlocksHtml,
  snapshotHtml,
}: DeploymentPanelProps) {
  const [subdomain, setSubdomain] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [error, setError] = useState<{ title: string; description: string } | null>(null);
  const renderSectionRef = useRef<HTMLDivElement>(null);

  const handleDeploy = async () => {
    try {
      const { url } = await deployPage({
        pageId,
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
    <Box>
      {error && (
        <ErrorAlert
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}
      <motion.div
        initial={{ width: "0%" }}
        animate={isRendered ? { width: "100%" } : {}}
        transition={{ duration: 1 }}
        style={{
          transformOrigin: "left",
          display: isRendered ? "block" : "none",
        }}
      >
        <Box ref={renderSectionRef} display="flex" flexDirection="column">
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
