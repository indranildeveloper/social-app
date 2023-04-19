import { FC, ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Next Social",
  description: "NextJS Social Media App",
};

interface IRootLayout {
  children: ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }: IRootLayout) => {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
