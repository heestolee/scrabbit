import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import { Mode } from "../../../app/MainContent";
import { useErrorToast } from "@/hooks/useErrorToast";

interface FetchedPageRendererProps {
  snapshotHtml: string | null;
  deployMode: Mode;
  selectedBlocksHtml: { id: string; html: string }[];
  setSelectedBlocksHtml: React.Dispatch<
    React.SetStateAction<{ id: string; html: string }[]>
  >;
}

export default function FetchedPageRenderer({
  snapshotHtml,
  deployMode,
  selectedBlocksHtml,
  setSelectedBlocksHtml,
}: FetchedPageRendererProps) {
  const showErrorToast = useErrorToast();
  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const targetWidth = 1200;
      const calculatedScale = Math.min(1, width / targetWidth);
      setScale(calculatedScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateSelectedBlocks = () => {
    if (containerRef.current) {
      const allBlocks =
        containerRef.current.querySelectorAll("[data-block-id]");
      allBlocks.forEach((block) => {
        const blockId = block.getAttribute("data-block-id");
        if (blockId && selectedBlocksHtml.some((b) => b.id === blockId)) {
          block.setAttribute("data-selected", "true");
        } else {
          block.removeAttribute("data-selected");
        }
      });
    }
  };

  useEffect(() => {
    updateSelectedBlocks();
  }, [selectedBlocksHtml]);

  const handleBlockClick = useCallback(
    (blockId: string, blockElement: HTMLElement) => {
      if (deployMode !== "partial") return;

      try {
        const blockHtml = DOMPurify.sanitize(blockElement.outerHTML, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
        });

        setSelectedBlocksHtml((prev) => {
          const isSelected = prev.some((block) => block.id === blockId);
          return isSelected
            ? prev.filter((block) => block.id !== blockId)
            : [...prev, { id: blockId, html: blockHtml }];
        });
      } catch (error) {
        showErrorToast("🚨 블럭 선택 오류", error);
      }
    },
    [deployMode, setSelectedBlocksHtml, showErrorToast],
  );

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (deployMode !== "partial") return;
    e.stopPropagation();

    const blockElement = (e.target as HTMLElement).closest("[data-block-id]");
    if (blockElement) {
      blockElement.setAttribute("data-hovered", "true");
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const blockElement = (e.target as HTMLElement).closest("[data-block-id]");
    if (blockElement) {
      blockElement.removeAttribute("data-hovered");
    }
  };

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const blockElement = (e.target as HTMLElement).closest(
        "[data-block-id]",
      ) as HTMLElement | null;
      if (blockElement) {
        const blockId = blockElement.getAttribute("data-block-id");
        if (blockId) {
          handleBlockClick(blockId, blockElement);
        }
      }
    },
    [handleBlockClick],
  );

  if (!snapshotHtml) return <div>No data available.</div>;

  return (
    <Box id="left-panel">
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: snapshotHtml }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleOnClick}
        style={{
          cursor: deployMode === "partial" ? "pointer" : "default",
          scale: scale,
          transformOrigin: "top left",
        }}
      />
      <style>
        {`
          #left-panel [data-block-id][data-selected="true"] {
            outline: 2px solid #4d91ff !important;
          }

          #left-panel [data-block-id][data-hovered="true"] {
            outline: 2px solid #62aaff !important;
          }
        `}
      </style>
    </Box>
  );
}
