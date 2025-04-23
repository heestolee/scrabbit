import { ReactElement } from "react";
import { ColorModeScript } from "@chakra-ui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import theme from "@/shared/theme";

type RootLayoutProps = {
  children: ReactElement;
  guide: ReactElement;
};

export const metadata = {
  title: "scrabbit",
};

export default function RootLayout({ children, guide }: RootLayoutProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_ID) {
    console.error("Google Analytics ID가 설정되지 않았습니다.");
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="chakra-ui-light">
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {children}
        {guide}
      </body>
    </html>
  );
}
