import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useMediaQuery,
} from "@chakra-ui/react";
import { TooltipButton } from "@/components/guide/TooltipButton";

type GuidePopoverProps = {
  children: React.JSX.Element;
};

export const GuidePopover = ({ children }: GuidePopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTabletOrMobile] = useMediaQuery("(max-width: 768px)");

  const handlePopoverOpen = () => setIsPopoverOpen(true);
  const handlePopoverClose = () => setIsPopoverOpen(false);

  return (
    <Popover onOpen={handlePopoverOpen} onClose={handlePopoverClose}>
      <PopoverTrigger>
        <TooltipButton isTooltipDisabled={isPopoverOpen} onClick={() => {}} />
      </PopoverTrigger>
      <PopoverContent
        borderRadius="15px"
        boxShadow="md"
        width={isTabletOrMobile ? "90vw" : "38rem"}
        maxWidth="90vw"
        padding="10px"
        backgroundColor="white"
        zIndex="10"
        style={{
          position: "absolute",
          top: isTabletOrMobile ? "10px" : "40px",
          right: isTabletOrMobile ? "1vw" : "-40px",
          overflowY: "auto",
          maxHeight: "80vh",
        }}
        fontFamily="'Malgun Gothic', sans-serif"
      >
        <PopoverArrow />
        <PopoverCloseButton right="1px" />
        <PopoverBody fontSize={isTabletOrMobile ? "sm" : "md"}>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
