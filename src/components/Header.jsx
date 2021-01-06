import React, { useContext } from "react";
import {
  Flex,
  chakra,
  Box,
  useMediaQuery,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../hooks/useAuth";
import ConfirmationModal from "./ConfirmationModal";

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
    >
      <ChakraLink to="/" cursor="pointer">
        Logo
      </ChakraLink>
      {isLargerThan450 ? (
        <Box ml="auto" mr="2">
          <ChakraLink to="/" cursor="pointer" mr="4">
            New
          </ChakraLink>
          <ChakraLink to="/create" cursor="pointer" mr="4">
            CreateTopic
          </ChakraLink>
          {user ? (
            <Box as="span" onClick={onOpen} cursor="pointer">
              Signout
            </Box>
          ) : (
            <ChakraLink to="/signIn" cursor="pointer" mr="4">
              Login
            </ChakraLink>
          )}
        </Box>
      ) : (
        <Box ml="auto" mr="2">
          <MobileMenu />
        </Box>
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
