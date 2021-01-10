import React from "react";
import {
  Flex,
  chakra,
  Box,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ConfirmationModal from "../auth/ConfirmationModal";
import BurgerMenu from "./BurgerMenu";

export const ChakraLink = chakra(Link);
export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const { user, signout } = useAuth();

  const signoutClose = () => {
    signout();
    onClose();
  };
  return (
    <Flex
      bg="gray.700"
      w="100vw"
      p="2"
      color="white"
      justifyContent="space-between"
      fontSize="15px"
      alignItems="center"
      position="sticky"
      letterSpacing="1px"
    >
      <ChakraLink to="/" cursor="pointer" _hover={{ color: "teal.200" }}>
        Home
      </ChakraLink>
      {isLargerThan450 ? (
        <Box ml="auto" mr="2">
          {user && (
            <ChakraLink
              to="/create"
              cursor="pointer"
              mr="6"
              _hover={{ color: "teal.200" }}
            >
              CreateTopic
            </ChakraLink>
          )}

          {user ? (
            <Box
              as="span"
              onClick={onOpen}
              cursor="pointer"
              _hover={{ color: "teal.200" }}
            >
              {user.displayName} | Logout
            </Box>
          ) : (
            <ChakraLink
              to="/signIn"
              cursor="pointer"
              mr="4"
              _hover={{ color: "teal.200" }}
            >
              Login
            </ChakraLink>
          )}
        </Box>
      ) : (
        <BurgerMenu />
      )}

      <ConfirmationModal
        title="Do you want to log out"
        isOpen={isOpen}
        onClose={onClose}
        signoutClose={signoutClose}
      />
    </Flex>
  );
}
