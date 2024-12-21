import React from "react";
import { Tooltip, Button, Icon, Box } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

type TooltipButtonProps = {
  isTooltipDisabled: boolean;
  onClick: () => void;
};

export const TooltipButton = ({
  isTooltipDisabled,
  onClick,
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
          width="60px"
          height="60px"
          boxShadow="lg"
          _hover={{ backgroundColor: "blue.400" }}
          onClick={onClick}
        >
          <Icon as={InfoOutlineIcon} w="6" h="6" />
        </Button>
      </Tooltip>
    </Box>
  );
};
