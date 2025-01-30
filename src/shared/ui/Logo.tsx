import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface LogoProps {
  isRendered: boolean;
  onClick: () => void;
}

export default function Logo({ isRendered, onClick }: LogoProps) {
  return (
    <Box
      top={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={onClick}
    >
      <Image
        src="/scrabbit.svg"
        alt="scrabbit logo"
        width={isRendered ? "50" : "100"}
        height={50}
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
