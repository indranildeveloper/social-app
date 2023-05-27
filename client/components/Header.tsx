"use client";

import {
  Container,
  Box,
  Flex,
  Heading,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const Header = () => {
  return (
    <Box
      borderBottom={1}
      borderStyle="solid"
      borderColor="gray.200"
      shadow="sm"
    >
      <Container maxW="8xl">
        <Flex
          minH="60px"
          px={4}
          py={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link
            href="/"
            color="messenger.500"
            _hover={{ color: "messenger.600" }}
          >
            <Heading as="h2" size="md">
              DevConnector
            </Heading>
          </Link>

          <Stack direction="row" gap={2} alignItems="center">
            <Link
              href="/about"
              color="messenger.500"
              _hover={{ color: "messenger.600" }}
            >
              <Text fontSize="lg" fontWeight="bold">
                About
              </Text>
            </Link>
            <Link href="/register">
              <Button colorScheme="teal">Register</Button>
            </Link>
            <Link href="/login">
              <Button colorScheme="messenger">Log In</Button>
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
