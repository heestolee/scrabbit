"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DomainInputArea from "@/features/deploy/ui/DomainInputArea";
import DeployPreviewRenderer from "@/features/deploy/ui/DeployPreviewRenderer";
import DeployModal from "@/features/deploy/ui/DeployModal";
import { useDeployPage } from "@/features/deploy/api/deployPage";
import commonStyles from "@/shared/theme/commonStyles";
import { Mode } from "../../../app/MainContent";
import { useErrorToast } from "@/shared/hooks/useErrorToast";

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
  const { mutate: deployPage, isPending: isDeploying } = useDeployPage();

  const handleDeploy = () => {
    if (!subdomain.trim()) {
      showErrorToast(
        "🚨 서브도메인을 입력하세요.",
        "서브도메인 값이 비어 있습니다.",
      );
      return;
    }

    deployPage(
      { subdomain, deployMode, selectedBlocksHtml, snapshotHtml },
      {
        onSuccess: ({ url }) => {
          setModalMessage(url ?? "배포 성공");
          setStatusCode(200);
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "페이지 생성 중 오류 발생";
          showErrorToast("🚨 페이지 생성 실패", errorMessage);
          setModalMessage(errorMessage);
          setStatusCode(500);
        },
        onSettled: () => {
          setIsModalOpen(true);
        },
      },
    );
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
            setSubdomain={(value) => setSubdomain(value ?? "")}
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
