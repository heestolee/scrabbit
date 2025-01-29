import { useState } from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import slides from "@/components/expansion-cards/slides";

export default function ExpansionCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Flex
      justify="center"
      alignItems="center"
      gap={4}
      mt={6}
      px={4}
      flexWrap="nowrap"
      flexDirection={{ base: "column", xl: "row" }}
      width="100%"
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          onClick={() => handleExpand(index)}
          transition="all 0.3s ease-in-out"
          flexGrow={expandedIndex === index ? 2 : 1}
          maxWidth="100%"
          width={{
            base: "100%",
            xl: expandedIndex === index ? "50%" : "25%",
          }}
          cursor="pointer"
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          boxShadow="lg"
          bg="gray.100"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height={{
            base: expandedIndex === index ? "340px" : "180px",
            xl: "400px",
          }}
          _hover={{
            boxShadow: "xl",
            transform: expandedIndex === index ? "none" : "scale(1.04)",
          }}
        >
          {expandedIndex !== index && (
            <Box textAlign="center">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <span>{slide.icon}</span> {slide.mainTitle}
              </Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                {slide.subTitle}
              </Text>
            </Box>
          )}
          {expandedIndex === index && (
            <>
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                objectFit="fill"
                width="100%"
                height="100%"
                transition="all 0.3s ease-in-out"
              />
              <Box
                bg="rgba(0, 0, 0, 0.7)"
                color="white"
                width="100%"
                p={4}
                transition="all 0.3s ease-in-out"
              >
                <Text fontSize="md" fontWeight="bold">
                  {slide.description}
                </Text>
              </Box>
            </>
          )}
        </Box>
      ))}
    </Flex>
  );
}
