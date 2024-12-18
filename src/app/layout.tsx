import { ReactElement } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type RootLayoutProps = {
  children: ReactElement;
};

export const metadata = {
  title: "scrabbit",
};

export default function RootLayout({ children }: RootLayoutProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_ID) {
    console.error("Google Analytics ID가 설정되지 않았습니다.");
  }

  return (
    <html lang="ko">
      <head />
      <body>
        <GoogleAnalytics gaId={GA_ID!} />
        {children}
      </body>
    </html>
  );
}
