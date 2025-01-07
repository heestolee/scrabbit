import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Noto Sans', sans-serif",
    body: "'Noto Sans', sans-serif",
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Noto Sans', sans-serif",
        lineHeight: "1.6",
      },
    },
  },
});

export default theme;
