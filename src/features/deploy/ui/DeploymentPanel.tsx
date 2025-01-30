"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/features/deploy/ui/DomainInputArea";
import DeployPreviewRenderer from "@/features/deploy/ui/DeployPreviewRenderer";
import DeployModal from "@/features/deploy/ui/DeployModal";
import { deployPage } from "@/features/deploy/api/deployPage";
import commonStyles from "@/theme/commonStyles";
import { Mode } from "../../../app/MainContent";
import { useErrorToast } from "@/hooks/useErrorToast";

interface DeploymentPanelProps {
  isRendered: boolean;
  deployMode: Mode;
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
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const showErrorToast = useErrorToast();

  const handleDeploy = async () => {
    try {
      const { url, error, status } = await deployPage({
        subdomain,
        deployMode,
        selectedBlocksHtml,
        snapshotHtml,
      });

      if (url) {
        setModalMessage(url);
      } else {
        setModalMessage(error || "페이지 생성 중 오류 발생");
      }
      setStatusCode(status);
    } catch (error) {
      showErrorToast("🚨 페이지 생성 실패", error);
      setModalMessage("페이지 생성 중 오류 발생");
      setStatusCode(500);
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
            statusCode={statusCode}
            closeModal={closeModal}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
