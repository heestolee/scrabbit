"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

import DeployModeSelector from "@/components/DeployModeSelector";
import UrlInputArea from "@/components/UrlInputArea";
import NotionPageRenderer from "@/components/NotionPageRenderer";
import DomainInputArea from "@/components/DomainInputArea";
import DeployPreviewRenderer from "@/components/DeployPreviewRenderer";
import LoadingAnimation from "@/components/LoadingAnimation";

import { fetchNotionPage } from "@/actions/fetchNotionPage";
import { deployNotionPage } from "@/actions/deployNotionPage";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import DeployModal from "@/components/DeployModal";

export default function Home() {
  const [deployMode, setDeployMode] = useState("full");
  const [notionUrl, setNotionUrl] = useState("");
  const [snapshotHtml, setSnapshotHtml] = useState(null);
  const [subdomain, setSubdomain] = useState("");
  const [notionPageId, setNotionPageId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [selectedBlocksHtml, setSelectedBlocksHtml] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const renderSectionRef = useRef(null);

  const handleFetch = async () => {
    setIsLoading(true);

    const { pageId, snapshotHtml, error } = await fetchNotionPage(notionUrl);
    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    setNotionPageId(pageId);
    setSnapshotHtml(snapshotHtml);
    setIsRendered(true);
    setIsLoading(false);
  };

  const handleDeploy = async () => {
    if (!subdomain) {
      alert("도메인을 입력하세요.");
      return;
    }

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

  const handleSelectBlock = (blockId) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId],
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCopied(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={notionPageId ? "" : "center"}
      minH="100vh"
      bg="gray.100"
      overflowY="hidden"
    >
      <motion.div
        initial={{ zoom: 1, x: 0 }}
        animate={
          isRendered
            ? { zoom: 0.1, x: "-470vw" }
            : isLoading
              ? { zoom: 0.1 }
              : { zoom: 1 }
        }
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Image
            src="/notiondrop.svg"
            alt="notiondrop logo"
            width={800}
            height={400}
          />
        </Box>
      </motion.div>
      <Box
        display="flex"
        flexDirection="row"
        w="full"
        justifyContent="space-around"
        height="100%"
      >
        <Box display="flex" flexDirection="column" alignItems="center" h="50%">
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

          {notionPageId && (
            <Box
              h="100%"
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
                  selectedBlocks={selectedBlocks}
                  handleSelectBlock={handleSelectBlock}
                  setSelectedBlocksHtml={setSelectedBlocksHtml}
                />
              )}
            </Box>
          )}
        </Box>

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
              selectedBlocks={selectedBlocks}
              selectedBlocksHtml={selectedBlocksHtml}
              setSelectedBlocksHtml={setSelectedBlocksHtml}
              width="90%"
            />
          </Box>
        </motion.div>
      </Box>
      <DeployModal
        isModalOpen={isModalOpen}
        modalMessage={modalMessage}
        closeModal={closeModal}
      />
    </Box>
  );
}
