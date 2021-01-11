import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { handelComment } from "../utils/helper";
import CommentItem from "./CommentItem";
import useFirestore from "../hooks/useFirestore";

export default function CommentDrawer({ isOpen, onClose, user, id, toast }) {
  const [error, setError] = useState();
  const { docs } = useFirestore("links");
  const textInput = useRef();

  //Try to ()then/async) avoid using firetore ref
  //instead of using useFirestore custom hook whcih is async
  const result = docs && docs.filter((doc) => doc.id === id)[0];

  // react hook form didbt work with drawer
  //using useRef
  const handelFormValue = (e) => {
    e.preventDefault();
    if (
      textInput.current.value.length >= 50 ||
      textInput.current.value.length === 0
    ) {
      setError("The comment must not be blank or more than 25 characters");
      return;
    } else {
      setError("");
      const comment = textInput.current.value;
      handelComment(user, id, toast, comment);
      textInput.current.value = "";
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={["md"]}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Comments</DrawerHeader>

            <DrawerBody>
              <form id="my-form" onSubmit={handelFormValue}>
                <Input ref={textInput} placeholder="Write your comment" />
                {error && (
                  <Text color="red.300" letterSpacing="1px">
                    {error}
                  </Text>
                )}
                <Flex mt="2">
                  <Button form="my-form" type="submit" bg="gray.100" mr={3}>
                    Post
                  </Button>
                  <Box>
                    <Button bg="gray.100" onClick={onClose}>
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </form>
              <SimpleGrid minChildWidth="250px" spacing="10px" mt="4">
                {result?.comments &&
                  result?.comments.map((comment) => (
                    <CommentItem
                      key={comment.commentedBy.createdAt}
                      {...comment}
                      user={user}
                      docId={id}
                    />
                  ))}
              </SimpleGrid>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
