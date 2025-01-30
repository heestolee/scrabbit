import React from "react";
import { Tooltip, Button, Icon, Box } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

type TooltipButtonProps = {
  isTooltipDisabled: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
};

export const TooltipButton = ({
  isTooltipDisabled,
  onMouseDown,
}: TooltipButtonProps) => {
  return (
    <Box>
      <Tooltip
        label="사용 가이드를 볼 수 있습니다"
        placement="top-end"
        hasArrow
        bg="gray.700"
        color="white"
        fontSize="sm"
        isDisabled={isTooltipDisabled}
      >
        <Button
          backgroundColor="blue.500"
          color="white"
          borderRadius="full"
          width="10"
          height="10"
          boxShadow="lg"
          _hover={{ backgroundColor: "blue.400" }}
          onMouseDown={onMouseDown}
        >
          <Icon as={InfoOutlineIcon} w="5" h="5" />
        </Button>
      </Tooltip>
    </Box>
  );
};
