import NAV_ITEMS from "@/data/navItems";
import { Flex, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import NavItemProps from "@/interfaces/NavItemProps";

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem: NavItemProps) => (
        <Stack spacing={4} key={navItem.id}>
          <Flex
            py={2}
            as={Link}
            href="#"
            justify="space-between"
            align="center"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text fontWeight={400} color="gray.600">
              {navItem.label}
            </Text>
          </Flex>
        </Stack>
      ))}
    </Stack>
  );
};

export default MobileNav;
