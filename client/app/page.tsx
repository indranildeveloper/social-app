"use client";

import { FC, JSX } from "react";
import { Container, Button, Text } from "@chakra-ui/react";

const Home: FC = (): JSX.Element => {
  return (
    <Container maxW="8xl">
      <Text fontSize="6xl">Social App</Text>
      <Button colorScheme="blue">Click Me!</Button>
    </Container>
  );
};

export default Home;
