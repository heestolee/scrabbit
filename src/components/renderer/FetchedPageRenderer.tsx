"use client";

import { useEffect, useRef, useCallback, useState } from "react";
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
  selectedBlocksHtml,
  setSelectedBlocksHtml,
}: FetchedPageRendererProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<{ title: string; description: string } | null>(null);

  const handleBlockClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      try {
        event.preventDefault();
        event.stopPropagation();

        const blockElement = event.currentTarget as HTMLElement;
        const blockId =
          blockElement.getAttribute("data-block-id") || blockElement.textContent || "";

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
                    html: DOMPurify.sanitize(blockElement.outerHTML)
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

  useEffect(() => {
    if (deployMode !== "partial" || !pageRef.current) return;

    const blockElements = pageRef.current.querySelectorAll<HTMLElement>(
      "*:not(script):not(style):not(link)",
    );

    const handleEventListener: EventListener = (event) => {
      handleBlockClick(event as unknown as React.MouseEvent<HTMLElement>);
    };

    blockElements.forEach((block) => {
      const blockId =
        block.getAttribute("data-block-id") || block.textContent || "";

      block.addEventListener("click", handleEventListener);

      const isSelected = selectedBlocksHtml.some((b) => b.id === blockId);
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
        block.removeEventListener("click", handleEventListener);
      });
    };
  }, [selectedBlocksHtml, handleBlockClick, deployMode]);

  if (!snapshotHtml) return <div>No data available.</div>;

  return (
    <Box h="100%" textAlign="left" ref={pageRef}>
      {error && (
        <ErrorAlert
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}
      <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(snapshotHtml, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }} />
    </Box>
  );
}
