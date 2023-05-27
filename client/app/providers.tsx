"use client";

import { FC, ReactNode, JSX } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

interface IProviderProps {
  children: ReactNode;
}

const Providers: FC<IProviderProps> = ({ children }): JSX.Element => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
