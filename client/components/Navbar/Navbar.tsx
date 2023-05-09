"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      borderBottom={1}
      borderStyle="solid"
      borderColor="gray.200"
      shadow="sm"
    >
      <Container maxW="8xl">
        <Flex color="gray.600" minH="60px" py={{ base: 4 }}>
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              colorScheme="gray"
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            alignItems="center"
            justify={{ base: "center", md: "start" }}
          >
            <Link href="/">
              <Text
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily="heading"
                fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
              >
                Dev Connector
              </Text>
            </Link>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={2}
          >
            <Link href="/login">
              <Button colorScheme="blue" fontSize="sm" fontWeight={400}>
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={400}
                colorScheme="green"
              >
                Register
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Container>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;
