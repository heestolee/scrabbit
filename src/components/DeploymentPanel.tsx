"use client";

import { useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/components/DomainInputArea";
import DeployPreviewRenderer from "@/components/DeployPreviewRenderer";
import DeployModal from "@/components/DeployModal";
import { deployPage } from "@/actions/deployPage";

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
  const renderSectionRef = useRef<HTMLDivElement>(null);

  const handleDeploy = async () => {
    const { url, error } = await deployPage({
      pageId,
      subdomain,
      deployMode,
      selectedBlocksHtml,
      snapshotHtml,
    });

    if (error) {
      setModalMessage(error);
    } else {
      setModalMessage(`배포된 사이트: ${url}`);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={isRendered ? { width: "30%" } : {}}
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
  );
}
