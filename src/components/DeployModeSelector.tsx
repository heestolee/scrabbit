import React from "react";
import { Box, FormControl, FormLabel, Switch } from "@chakra-ui/react";

export default function DeployModeSelector({ deployMode, setDeployMode }) {
  const handleSwitchChange = () => {
    setDeployMode(deployMode === "full" ? "partial" : "full");
  };

  return (
    <Box>
      <FormControl display="flex" alignItems="center" justifyContent="center">
        <FormLabel
          htmlFor="deploy-mode-switch"
          m="0"
          color={deployMode === "full" ? "black" : "gray.300"}
        >
          전체배포
        </FormLabel>
        <Switch
          id="deploy-mode-switch"
          isChecked={deployMode === "partial"}
          onChange={handleSwitchChange}
          colorScheme="blue"
          gap={2}
          px={2}
        />
        <FormLabel
          htmlFor="deploy-mode-switch"
          mb="0"
          color={deployMode === "full" ? "gray.300" : "black"}
        >
          부분배포
        </FormLabel>
      </FormControl>
    </Box>
  );
}
