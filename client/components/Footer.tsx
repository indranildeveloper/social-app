"use client";

import { Box, Center, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      borderTop="1px"
      borderStyle="solid"
      borderColor="gray.200"
      p={8}
      position="absolute"
      bottom={0}
      width="100%"
    >
      <Center flexDirection="column">
        <Text fontSize="lg">Made with 💙 By Indranil Halder</Text>
        <Text>Copyright &copy; 2023</Text>
      </Center>
    </Box>
  );
};

export default Footer;
