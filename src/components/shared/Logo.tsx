import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface LogoProps {
  isRendered: boolean;
}

export default function Logo({ isRendered }: LogoProps) {
  return (
    <Box
      position={isRendered ? "sticky" : "static"}
      top={0}
      zIndex={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src="/scrabbit.svg"
        alt="scrabbit logo"
        width={100}
        height={50}
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
