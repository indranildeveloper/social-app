import React from "react";
import "./globals.css";

export const metadata = {
  title: "DevConnector",
  description: "A social media application for developers",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
