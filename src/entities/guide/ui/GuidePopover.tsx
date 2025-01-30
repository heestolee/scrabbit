import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useMediaQuery,
} from "@chakra-ui/react";
import { TooltipButton } from "@/entities/guide/ui/TooltipButton";

type GuidePopoverProps = {
  children: React.JSX.Element;
};

export const GuidePopover = ({ children }: GuidePopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTabletOrMobile] = useMediaQuery("(max-width: 768px)");

  const handlePopoverToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPopoverOpen((prev) => !prev);
  };

  const handlePopoverClose = () => setIsPopoverOpen(false);

  return (
    <Popover isOpen={isPopoverOpen} onClose={handlePopoverClose}>
      <div>
        <TooltipButton
          isTooltipDisabled={isPopoverOpen}
          onMouseDown={handlePopoverToggle}
        />
      </div>
      {isPopoverOpen && (
        <PopoverContent
          borderRadius="15px"
          boxShadow="md"
          width={isTabletOrMobile ? "90vw" : "38rem"}
          maxWidth="90vw"
          padding="10px"
          backgroundColor="white"
          zIndex="10"
          position="absolute"
          style={{
            top: isTabletOrMobile ? "10px" : "40px",
            right: isTabletOrMobile ? "1vw" : "-40px",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
          fontFamily="'Malgun Gothic', sans-serif"
          onClick={(e) => e.stopPropagation()}
        >
          <PopoverArrow />
          <PopoverBody fontSize={isTabletOrMobile ? "sm" : "md"}>
            {children}
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};
