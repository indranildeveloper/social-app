import { FC, ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Next Social",
  description: "NextJS Social Media App",
};

interface IRootLayout {
  children: ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }: IRootLayout) => {
  return (
    <html lang="en" data-theme="winter">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
