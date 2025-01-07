import { Box, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import slides from "@/components/carousel/slides";
import Indicator from "@/components/carousel/Indicator";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    let timer: number | null = null;

    if (isAutoPlay) {
      const currentSlideDuration = slides[currentIndex]?.duration || 17000;
      timer = window.setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, currentSlideDuration);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [isAutoPlay, currentIndex]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <Box
      position="relative"
      mx="auto"
      textAlign="center"
      boxShadow="xl"
      borderRadius="md"
      p={4}
    >
      <Box>
        <Image
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          borderRadius="md"
          mx="auto"
          w="100%"
          objectFit="cover"
        />
        <Text
          mt={4}
          fontSize="lg"
          fontWeight="semibold"
          color="gray.700"
          fontFamily="'Noto Sans', sans-serif"
          lineHeight="1.6"
        >
          {slides[currentIndex].description}
        </Text>
      </Box>
      <Indicator
        slides={slides}
        currentIndex={currentIndex}
        goToSlide={goToSlide}
      />
    </Box>
  );
}
