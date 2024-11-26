"use client";

import { useEffect, useRef, useCallback } from "react";
import { Box } from "@chakra-ui/react";

export default function FetchedPageRenderer({
  snapshotHtml,
  deployMode,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
}) {
  const pageRef = useRef(null);

  const handleBlockClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const blockElement = event.currentTarget;
      const blockId =
        blockElement.getAttribute("data-block-id") || blockElement.textContent;

      console.log("선택한 블록아이디: ", blockId);
      console.log("선택한 블록 : ", blockElement);

      if (deployMode === "partial") {
        blockElement.style.outline = "none";
        blockElement.style.cursor = "default";

        setSelectedBlocksHtml((prev) => {
          const isAlreadySelected = prev.some((block) => block.id === blockId);

          return isAlreadySelected
            ? prev.filter((block) => block.id !== blockId)
            : [
                ...prev,
                {
                  id: blockId,
                  html: blockElement.outerHTML,
                },
              ];
        });
      }
    },
    [deployMode, setSelectedBlocksHtml],
  );

  useEffect(() => {
    if (deployMode !== "partial") return;

    const blockElements = pageRef.current.querySelectorAll(
      "*:not(script):not(style):not(link)",
    );

    blockElements.forEach((block) => {
      const blockId = block.getAttribute("data-block-id") || block.textContent;

      block.addEventListener("click", handleBlockClick);

      const isSelected = selectedBlocksHtml.some(
        (block) => block.id === blockId,
      );
      block.style.outline = isSelected ? "2px solid #62aaff" : "none";

      block.addEventListener("mouseenter", () => {
        if (!isSelected) {
          block.style.outline = "1px dashed lightgray";
          block.style.cursor = "pointer";
        }
      });

      block.addEventListener("mouseleave", () => {
        if (!isSelected) {
          block.style.outline = "none";
        }
      });
    });

    return () => {
      blockElements.forEach((block) => {
        block.removeEventListener("click", handleBlockClick);
      });
    };
  }, [selectedBlocksHtml, handleBlockClick, deployMode]);

  if (!snapshotHtml) return <div>No data available.</div>;

  return (
    <Box h="100%" textAlign="left" ref={pageRef}>
      <Box dangerouslySetInnerHTML={{ __html: snapshotHtml }} />
    </Box>
  );
}
