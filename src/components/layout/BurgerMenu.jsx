import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  chakra,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import ConfirmationModal from "../auth/ConfirmationModal";
import { useAuth } from "../../hooks/useAuth";

export default function BurgerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ChakraLink = chakra(Link);
  const { user, signout } = useAuth();
  const signoutClose = () => {
    signout();
    onClose();
  };
  return (
    <>
      <Menu zIndex="10">
        <MenuButton
          as={IconButton}
          variant="null"
          borderStyle="none"
          outline="none"
          fontSize="25px"
          rightIcon={<BiMenuAltLeft />}
        />
        <MenuList fontSize="15px" color="black" bg="gray.300">
          {user && (
            <MenuItem>
              <ChakraLink
                to="/create"
                cursor="pointer"
                _hover={{ color: "teal.500" }}
                w="100%"
              >
                CreateTopic
              </ChakraLink>
            </MenuItem>
          )}
          <MenuItem>
            <ChakraLink
              to="/about"
              cursor="pointer"
              w="100%"
              _hover={{ color: "teal.200" }}
            >
              About
            </ChakraLink>
          </MenuItem>
          {user ? (
            <MenuItem>
              <Box
                as="span"
                onClick={onOpen}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                {user.displayName} | Logout
              </Box>
            </MenuItem>
          ) : (
            <MenuItem>
              <ChakraLink
                to="/signIn"
                cursor="pointer"
                w="100%"
                _hover={{ color: "teal.500" }}
              >
                Login
              </ChakraLink>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <ConfirmationModal
        title="Do you want to log out"
        isOpen={isOpen}
        onClose={onClose}
        signoutClose={signoutClose}
      />
    </>
  );
}
