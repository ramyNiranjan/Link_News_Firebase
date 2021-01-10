import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DeletePopup from "./DeletePopup";

export default function PopupMenu({ listId }) {
  const ChakraLink = chakra(Link);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Menu color="black">
        <MenuButton
          as={IconButton}
          variant="null"
          borderStyle="none"
          outline="none"
          icon={<BiDotsHorizontalRounded />}
          fontSize="20px"
          _hover={{ color: "teal.200", transform: "scale(1.2)" }}
        />
        <MenuList fontSize="15px" color="black" bg="gray.300">
          <MenuItem>
            <ChakraLink to={`/edit/${listId}`} cursor="pointer" mr="4" w="100%">
              Edit
            </ChakraLink>
          </MenuItem>
          <MenuItem onClick={onOpen}>Delete</MenuItem>
        </MenuList>
      </Menu>
      <DeletePopup isOpen={isOpen} onClose={onClose} itemId={listId} />
    </>
  );
}
