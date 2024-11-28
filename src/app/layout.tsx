import { ReactElement } from "react";

type RootLayoutProps = {
  children: ReactElement;
};

export const metadata = {
  title: "scrabbit",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
