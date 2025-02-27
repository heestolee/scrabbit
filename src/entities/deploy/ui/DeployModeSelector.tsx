import { Box, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { Mode } from "@/app/MainContent";

interface DeployModeSelectorProps {
  deployMode: Mode;
  setDeployMode: (mode: Mode) => void;
}

export default function DeployModeSelector({
  deployMode,
  setDeployMode,
}: DeployModeSelectorProps) {
  const handleSwitchChange = () => {
    setDeployMode(deployMode === "full" ? "partial" : "full");
  };

  return (
    <Box w="300px">
      <FormControl display="flex" alignItems="center" justifyContent="center">
        <FormLabel
          htmlFor="deploy-mode-switch"
          m="0"
          color={deployMode === "full" ? "black" : "gray.300"}
        >
          전체선택
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
          부분선택
        </FormLabel>
      </FormControl>
    </Box>
  );
}
