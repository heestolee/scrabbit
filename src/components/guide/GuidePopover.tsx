import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { TooltipButton } from "@/components/guide/TooltipButton";

type GuidePopoverProps = {
  children: React.JSX.Element;
};

export const GuidePopover = ({ children }: GuidePopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
        width="38rem"
        padding="10px"
        backgroundColor="white"
        zIndex="10"
        style={{
          position: "absolute",
          top: "40px",
          right: "-40px",
        }}
        fontFamily="'Malgun Gothic', sans-serif"
      >
        <PopoverArrow />
        <PopoverCloseButton right="1px" />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
