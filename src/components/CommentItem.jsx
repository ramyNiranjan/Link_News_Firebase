import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { firestore } from "../firebase";
import { handelCommentEdit, handelCommentDelete } from "../utils/helper";

export default function CommentItem({
  commentedBy: { name, msg, id, createdAt },
  user,
  docId,
}) {
  const docRef = firestore.collection("links").doc(docId);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(msg);
  const [error, setError] = useState("");

  const handelFormEditValue = (e) => {
    e.preventDefault();
    if (value.length >= 50 || value === "") {
      setError("The comment must not be blank or more than 25 characters");
      return;
    } else {
      setError("");
      handelCommentEdit(value, docRef, createdAt);
      setIsOpen(!isOpen);
    }
  };

  return (
    <Box bg="gray.50" p="2">
      {!isOpen ? (
        <Text fontSize="sm">{msg}</Text>
      ) : (
        <Box as="form" id="my-form" onSubmit={handelFormEditValue}>
          <Input
            name="comment"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && (
            <Text color="red.300" letterSpacing="1px">
              {error}
            </Text>
          )}
          <Flex justify="center">
            <ButtonGroup justifyContent="center" size="sm" mt="1">
              <IconButton icon={<AiOutlineCheck />} type="submit" />
              <IconButton
                icon={<AiOutlineClose />}
                onClick={() => setIsOpen(!isOpen)}
              />
            </ButtonGroup>
          </Flex>
        </Box>
      )}

      <Flex fontSize="xs" justify="space-between" mt="2" color="gray.400">
        <Text>
          Posted by{" "}
          <Text as="span" color="teal.200">
            {id === user.uid ? "Me" : name}
          </Text>
        </Text>
        <Text>3 hours ago</Text>
        {id === user.uid && (
          <Flex>
            <Text
              onClick={() => handelCommentDelete(docRef, createdAt)}
              mr="2"
              color="red.300"
              cursor="pointer"
            >
              Delete
            </Text>
            <Text
              color="green.300"
              cursor="pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              Edit
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
