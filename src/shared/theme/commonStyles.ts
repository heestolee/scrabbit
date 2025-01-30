const commonStyles = {
  scrollBar: {
    "&::-webkit-scrollbar": {
      width: "0.625rem",
    },
    "&::-webkit-scrollbar-track": {
      background: "var(--chakra-colors-gray-400)",
      borderRadius: "0.625rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--chakra-colors-gray-500)",
      borderRadius: "0.625rem",
    },
  },
  panelContainer: {
    w: { base: "90%", md: "80%", lg: "65%" },
    h: "100%",
    p: "4",
    bg: "gray.50",
    borderRadius: "md",
    boxShadow: "md",
  },
  panelContent: {
    display: "flex",
    flexDirection: { base: "column", md: "row" } as const,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4",
    w: "100%",
  },
};

export default commonStyles;
