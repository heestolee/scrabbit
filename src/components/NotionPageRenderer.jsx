"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import { Box } from "@chakra-ui/react";
import { PSEUDO_ELEMENTS_STYLE } from "@/constant/constant";

export default function NotionPageRenderer({
  snapshotHtml,
  deployMode,
  setSelectedBlocksHtml,
}) {
  const pageRef = useRef(null);
  const [hoveredBlockId, setHoveredBlockId] = useState(null);
  const [clickOrder, setClickOrder] = useState(0);

  useEffect(() => {
    if (deployMode === "partial") {
      const style = document.createElement("style");
      style.innerHTML = PSEUDO_ELEMENTS_STYLE;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [deployMode]);

  const selectedBlocksHtml = useMemo(() => {
    if (deployMode !== "partial") return [];

    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(snapshotHtml, "text/html");
    const blockElements = parsedHtml.querySelectorAll(
      ".notion-page-content > *",
    );

    return Array.from(blockElements).map((block, index) => ({
      id: block.getAttribute("data-block-id"),
      order: index,
      html: block.outerHTML,
    }));
  }, [snapshotHtml, deployMode]);

  const handleBlockClick = useCallback(
    (event, blockId, blockOrder, blockHtml) => {
      event.preventDefault();

      if (deployMode === "partial") {
        setClickOrder((prevOrder) => prevOrder + 1);
        setSelectedBlocksHtml((prev) =>
          prev.some((block) => block.id === blockId)
            ? prev.filter((block) => block.id !== blockId)
            : [
                ...prev,
                {
                  id: blockId,
                  order: blockOrder,
                  clickOrder: clickOrder,
                  html: blockHtml,
                },
              ],
        );
      }
    },
    [deployMode, setSelectedBlocksHtml, clickOrder],
  );

  const handleMouseEnter = (blockId) => {
    if (!selectedBlocksHtml.some((block) => block.id === blockId)) {
      setHoveredBlockId(blockId);
    }
  };

  const handleMouseLeave = (blockId) => {
    if (!selectedBlocksHtml.some((block) => block.id === blockId)) {
      setHoveredBlockId(null);
    }
  };

  return (
    <Box h="45rem" p={4} textAlign="left" ref={pageRef}>
      {deployMode === "partial" ? (
        selectedBlocksHtml.map((block) => (
          <Box
            key={block.id}
            data-block-id={block.id}
            dangerouslySetInnerHTML={{ __html: block.html }}
            onClick={(e) =>
              handleBlockClick(e, block.id, block.order, block.html)
            }
            onMouseEnter={() => handleMouseEnter(block.id)}
            onMouseLeave={() => handleMouseLeave(block.id)}
            style={{
              outline: selectedBlocksHtml.includes(block.id)
                ? "2px solid #62aaff"
                : hoveredBlockId === block.id
                  ? "1px dashed lightgray"
                  : "none",
              cursor: "pointer",
              width: "fit-content",
            }}
          />
        ))
      ) : (
        <Box dangerouslySetInnerHTML={{ __html: snapshotHtml }} />
      )}
    </Box>
  );
}
