import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";

export default function MobileMenu() {
  const ChakraLink = chakra(Link);
  return (
    <Menu color="black" zIndex="10">
      <MenuButton
        as={IconButton}
        variant="null"
        borderStyle="none"
        outline="none"
        icon={<BiMenuAltLeft />}
        fontSize="20px"
      />
      <MenuList fontSize="15px" color="black" bg="gray.300">
        <MenuItem>
          <ChakraLink to="/" cursor="pointer" mr="4" w="100%">
            New
          </ChakraLink>
        </MenuItem>
        <MenuItem>
          <ChakraLink to="/create" cursor="pointer" mr="4" w="100%">
            CreateTopic
          </ChakraLink>
        </MenuItem>
        <MenuItem>
          <ChakraLink to="/signIn" cursor="pointer" mr="4" w="100%">
            SignIn
          </ChakraLink>
        </MenuItem>
        <MenuItem>
          <ChakraLink to="/signUp" cursor="pointer" mr="4" w="100%">
            SignUp
          </ChakraLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
