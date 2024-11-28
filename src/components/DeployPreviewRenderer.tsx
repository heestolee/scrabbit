"use client";

import { Box, Center } from "@chakra-ui/react";

interface DeployPreviewRendererProps {
  deployMode: "full" | "partial";
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
          selectedBlocksHtml.map((block, id) => (
            <Box
              key={id}
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
