"use client";

import { FC, JSX } from "react";
import {
  Heading,
  Text,
  Container,
  Center,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const Home: FC = (): JSX.Element => {
  return (
    <Box h="80vh">
      <Container maxW="8xl">
        <Center flexDirection="column" mt={8}>
          <Heading color="messenger.500">Welcome to DevConnector</Heading>
          <Text fontSize="lg">
            Connect with developers throughout the world!
          </Text>
        </Center>
        <Center mt={4} gap={4}>
          <Link href="/register">
            <Button colorScheme="teal">Register</Button>
          </Link>
          <Link href="/login">
            <Button colorScheme="messenger">Log In</Button>
          </Link>
        </Center>
      </Container>
    </Box>
  );
};

export default Home;
