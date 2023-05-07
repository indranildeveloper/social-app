import React from "react";
import Providers from "./providers";

export const metadata = {
  title: "Social App",
  description: "Social Media App for developers.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
