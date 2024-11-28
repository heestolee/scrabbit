import React from "react";
import { Box, Input, Button, FormControl } from "@chakra-ui/react";

interface DomainInputAreaProps {
  subdomain: string;
  setSubdomain: React.Dispatch<React.SetStateAction<string>>;
  handleDeploy: () => void;
}

export default function DomainInputArea({
  subdomain,
  setSubdomain,
  handleDeploy,
}: DomainInputAreaProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDeploy();
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" py={4} w="100%">
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          bg={"white"}
          borderRadius={"xl"}
          height={"10%"}
          px={3}
        >
          <FormControl display="flex" alignItems="baseline" px="2">
            https://
            <Input
              id="subdomain"
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="배포 URL 입력"
              fontSize="12"
              border="none"
              minWidth="1"
              mr={2}
              pl={2}
            />
            .notiondrop.site
          </FormControl>
        </Box>
        <Button type="submit" colorScheme="green" width="20%">
          배포
        </Button>
      </form>
    </Box>
  );
}
