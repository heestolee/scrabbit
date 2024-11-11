"use client";

import { useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/components/DomainInputArea";
import DeployPreviewRenderer from "@/components/DeployPreviewRenderer";
import DeployModal from "@/components/DeployModal";
import { deployNotionPage } from "@/actions/deployNotionPage";

export default function DeploymentPanel({
  isRendered,
  deployMode,
  notionPageId,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
  snapshotHtml,
}) {
  const [subdomain, setSubdomain] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const renderSectionRef = useRef(null);

  const handleDeploy = async () => {
    const { url, error } = await deployNotionPage({
      notionPageId,
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
          setSelectedBlocksHtml={setSelectedBlocksHtml}
          width="90%"
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
