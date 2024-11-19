import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Logo({ isRendered, isLoading }) {
  return (
    <motion.div
      initial={{ zoom: 1, x: 0 }}
      animate={
        isRendered
          ? { zoom: 0.1, x: "-470vw" }
          : isLoading
            ? { zoom: 0.1 }
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
          src="/notiondrop.svg"
          alt="notiondrop logo"
          width={800}
          height={400}
        />
      </Box>
    </motion.div>
  );
}
