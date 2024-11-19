"use client";

import React, { useState } from "react";
import { Box, Center, Button } from "@chakra-ui/react";

export default function DeployPreviewRenderer({
  deployMode,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
}) {
  const [isSortedByClickOrder, setIsSortedByClickOrder] = useState(true);

  const handleBlockSort = () => {
    const newSortedBlocks = isSortedByClickOrder
      ? [...selectedBlocksHtml].sort((a, b) => a.order - b.order)
      : [...selectedBlocksHtml].sort((a, b) => a.clickOrder - b.clickOrder);

    setSelectedBlocksHtml(newSortedBlocks);
    setIsSortedByClickOrder(!isSortedByClickOrder);
  };

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
      <Button onClick={handleBlockSort} mb={4}>
        {isSortedByClickOrder ? "정렬된 순서로" : "선택된 순서로"}
      </Button>
      <Box
        bg="white"
        p={4}
        w="90%"
        flexDirection="column"
        height="80%"
        overflowY="scroll"
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
            backgroundColor: "var(--chakra-colors-gray-500)",
            borderRadius: "0.625rem",
          },
        }}
        style={{ zoom: 0.6 }}
      >
        {deployMode === "partial" && selectedBlocksHtml.length ? (
          selectedBlocksHtml.map((block, order) => (
            <Box
              key={order}
              dangerouslySetInnerHTML={{ __html: block.html }}
              h="max-content"
            />
          ))
        ) : deployMode === "full" ? (
          <Center>전체배포 모드입니다.</Center>
        ) : (
          <Center>부분배포 모드입니다.</Center>
        )}
      </Box>
    </Center>
  );
}
