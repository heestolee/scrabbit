import { Button, HStack } from "@chakra-ui/react";

interface IndicatorProps {
  slides: { id: number; image: string; description: string }[];
  currentIndex: number;
  goToSlide: (index: number) => void;
}

export default function Indicator({
  slides,
  currentIndex,
  goToSlide,
}: IndicatorProps) {
  return (
    <HStack justify="center" mt={4}>
      {slides.map((_, index) => (
        <Button
          key={index}
          size="xs"
          variant="ghost"
          colorScheme={currentIndex === index ? "blue" : "gray"}
          onClick={() => goToSlide(index)}
        >
          ●
        </Button>
      ))}
    </HStack>
  );
}
