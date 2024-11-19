import React from "react";
import { Box, Input, Button, FormControl } from "@chakra-ui/react";

export default function UrlInputArea({
  sourceUrl,
  setSourceUrl,
  handleFetch,
  isLoading,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleFetch();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      py={4}
      gap={3}
      alignItems="center"
      w="70%"
    >
      <FormControl width="100%" isRequired>
        <Input
          type="text"
          value={sourceUrl}
          bg={"white"}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="노션 url을 입력해주세요"
          borderColor="gray.300"
          borderRadius="md"
          _focus={{ borderColor: "blue.500" }}
          boxShadow="sm"
          w="100%"
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        width="20%"
        isLoading={isLoading}
        borderRadius="md"
        _hover={{ bg: "blue.400" }}
        boxShadow="md"
      >
        데이터 가져오기
      </Button>
    </Box>
  );
}
