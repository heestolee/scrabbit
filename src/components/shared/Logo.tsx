import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface LogoProps {
  isRendered: boolean;
  isLoading: boolean;
}

export default function Logo({ isRendered, isLoading }: LogoProps) {
  return (
    <motion.div
      initial={{ zoom: 1, x: 0 }}
      animate={
        isRendered
          ? { zoom: 0.6, position: "fixed", top: "20px", left: "1.25%" }
          : isLoading
            ? { zoom: 0.6 }
            : { zoom: 1 }
      }
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Image
          src="/scrabbit.svg"
          alt="scrabbit logo"
          width={100}
          height={50}
        />
      </Box>
    </motion.div>
  );
}
