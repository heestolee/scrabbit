"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import { handleError } from "@/utils/errorHandler";
import ErrorAlert from "@/components/error-boundary/ErrorAlert";

interface FetchedPageRendererProps {
  snapshotHtml: string | null;
  deployMode: "full" | "partial";
  setSelectedBlocksHtml: React.Dispatch<
    React.SetStateAction<{ id: string; html: string }[]>
  >;
}

export default function FetchedPageRenderer({
  snapshotHtml,
  deployMode,
  setSelectedBlocksHtml,
}: FetchedPageRendererProps) {
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [scale, setScale] = useState<number>(1);
  const hoverTimer = useRef<number | null>(null);

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

  const handleBlockClick = useCallback(
    (blockId: string, blockElement: HTMLElement) => {
      try {
        if (deployMode === "partial") {
          const blockHtml = DOMPurify.sanitize(blockElement.outerHTML, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
          });

          setSelectedBlocksHtml((prev) => {
            const isSelected = prev.some((block) => block.id === blockId);
            if (isSelected) {
              return prev.filter((block) => block.id !== blockId);
            } else {
              return [...prev, { id: blockId, html: blockHtml }];
            }
          });
        }
      } catch (error) {
        setError(handleError(error));
      }
    },
    [deployMode, setSelectedBlocksHtml],
  );

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (deployMode !== "partial") return;
    e.stopPropagation();
    clearTimeout(hoverTimer.current!);
    hoverTimer.current = window.setTimeout(() => {
      const blockElement = (e.target as HTMLElement).closest("[data-block-id]");
      const blockId = blockElement?.getAttribute("data-block-id");
      setHoveredBlockId(blockId || null);
    }, 100);
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHoveredBlockId(null);
  };

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const blockElement = (e.target as HTMLElement).closest(
        "[data-block-id]",
      ) as HTMLElement | null;

      if (blockElement && blockElement instanceof HTMLElement) {
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
    <Box>
      {error && (
        <ErrorAlert
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: snapshotHtml }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleOnClick}
        style={{
          cursor: deployMode === "partial" ? "pointer" : "default",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${100 / scale}%`,
        }}
      />
      <style>
        {`
          ${
            hoveredBlockId
              ? ` [data-block-id="${hoveredBlockId}"] { outline: 1px solid #62aaff !important; } `
              : ""
          }
        `}
      </style>
    </Box>
  );
}
