"use client";

import React from "react";
import { Box, Center } from "@chakra-ui/react";
import commonStyles from "@/shared/theme/commonStyles";
import { Mode } from "../../../app/MainContent";

interface DeployPreviewRendererProps {
  deployMode: Mode;
  selectedBlocksHtml: { id: string; html: string }[];
}

export default function DeployPreviewRenderer({
  deployMode,
  selectedBlocksHtml,
}: DeployPreviewRendererProps) {
  return (
    <Center
      display="flex"
      flexDirection="column"
      h="80vh"
      w="full"
      alignItems="center"
      justifyContent="center"
      bg="gray.300"
    >
      <Box
        bg="white"
        p={4}
        w="90%"
        height="90%"
        overflowX="auto"
        overflowY="auto"
        sx={commonStyles.scrollBar}
        style={{ zoom: 0.6 }}
      >
        {deployMode === "partial" && selectedBlocksHtml.length ? (
          selectedBlocksHtml.map((block, id) => (
            <Box
              key={id}
              dangerouslySetInnerHTML={{
                __html: block.html,
              }}
              h="max-content"
            />
          ))
        ) : deployMode === "full" ? (
          <Center>전체선택 모드입니다.</Center>
        ) : (
          <Center>부분선택 모드입니다.</Center>
        )}
      </Box>
    </Center>
  );
}
