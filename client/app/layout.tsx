import { FC, ReactNode } from "react";
import { Poppins } from "next/font/google";
import Providers from "./providers";

export const metadata = {
  title: "Social App",
  description: "Social Media App for developers.",
};

const poppins = Poppins({
  weight: "400",
  subsets: ["devanagari"],
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
