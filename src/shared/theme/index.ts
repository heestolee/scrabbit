import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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
