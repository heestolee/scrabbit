"use client";

import React, { useState, useCallback, useRef } from "react";
import { Box } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import { handleError } from "@/utils/errorHandler";
import ErrorAlert from "@/components/error-boundary/ErrorAlert";

interface FetchedPageRendererProps {
  snapshotHtml: string | null;
  deployMode: "full" | "partial";
  selectedBlocksHtml: { id: string; html: string }[];
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
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleBlockClick = useCallback(
    (blockId: string, blockHtml: string) => {
      try {
        if (deployMode === "partial") {
          setSelectedBlocksHtml((prev) => {
            const isSelected = prev.some((block) => block.id === blockId);
            return isSelected
              ? prev.filter((block) => block.id !== blockId)
              : [
                  ...prev,
                  {
                    id: blockId,
                    html: DOMPurify.sanitize(blockHtml, {
                      ADD_TAGS: ["iframe"],
                      ADD_ATTR: [
                        "allow",
                        "allowfullscreen",
                        "frameborder",
                        "scrolling",
                      ],
                    }),
                  },
                ];
          });
        }
      } catch (error) {
        setError(handleError(error));
      }
    },
    [deployMode, setSelectedBlocksHtml],
  );

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    clearTimeout(hoverTimer.current!);
    hoverTimer.current = setTimeout(() => {
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
      const blockElement = (e.target as HTMLElement).closest("[data-block-id]");
      if (blockElement) {
        const blockId = blockElement.getAttribute("data-block-id");
        const blockHtml = blockElement.outerHTML;
        if (blockId) {
          handleBlockClick(blockId, blockHtml);
          setSelectedBlockId(blockId === selectedBlockId ? null : blockId);
        }
      }
    },
    [handleBlockClick, selectedBlockId],
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
        }}
      />
      <style>
        {`
          ${
            hoveredBlockId
              ? `
            [data-block-id="${hoveredBlockId}"] {
              outline: 1px dashed lightgray !important;
            }
          `
              : ""
          }

          ${
            selectedBlockId
              ? `
                [data-block-id="${selectedBlockId}"] {
                  outline: 2px solid #62aaff !important;
                }
              `
              : ""
          }
        `}
      </style>
    </Box>
  );
}
