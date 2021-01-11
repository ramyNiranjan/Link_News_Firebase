import {
  Box,
  Flex,
  Text,
  HStack,
  StackDivider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { BiLike } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import React from "react";
import {
  getDomain,
  handelLike,
  colorLikeIcon,
  colorCommentIcon,
  toastAlert,
  convertToReadableDate,
} from "../utils/helper";
import { useAuth } from "../hooks/useAuth";
import CommentDrawer from "./CommentDrawer";
import LikeList from "./LikeCommentList";
import PopupMenu from "./PopupMenu";

export default function LinkItem({
  title,
  createdAt,
  description,
  link,
  likes,
  postedBy,
  id,
  comments,
}) {
  const { user } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLike,
    onOpen: onOpenLike,
    onClose: onCloseLike,
  } = useDisclosure();

  const handelCommentIcon = () => {
    if (!user) {
      toastAlert(
        toast,
        "You are not logged in",
        "Please login or create an account to comment",
        "info"
      );
      return;
    }
    onOpen();
  };

  return (
    <Flex direction="column" bg="gray.50" w="250" justify="space-between">
      <Box p="2">
        <Flex justifyContent="space-between" align="center">
          <Box fontSize="md" fontWeight="bold">
            {title}
          </Box>

          {user.uid === postedBy.id && <PopupMenu listId={id} />}
        </Flex>

        <Box fontSize="sm">{description}</Box>
        <Box
          mb="3"
          target="_blank"
          as="a"
          href={link}
          fontSize="xs"
          color="gray.400"
          _hover={{ color: "teal.500", textDecoration: "underLine" }}
          rel="noopener noreferrer"
        >
          <Text> {`Read more (${getDomain(link)})`}</Text>
        </Box>
      </Box>

      <Flex justify="space-between" align="baseline" direction="column" p="2">
        <HStack
          spacing="10px"
          divider={<StackDivider borderColor="gray.200" />}
          mt="2"
        >
          <HStack>
            <Text
              onClick={onOpenLike}
              fontSize="xs"
              color="teal.300"
              cursor="pointer"
              _hover={{ color: "teal.100" }}
            >
              ({likes.length})
            </Text>

            <LikeList list={likes} onClose={onCloseLike} isOpen={isOpenLike} />
            <Box _hover={{ fill: "#0C87F5" }}>
              <BiLike
                cursor="pointer"
                onClick={() => handelLike(user, id, toast)}
                fill={colorLikeIcon(likes, user).length && "#0C87F5"}
              />
            </Box>
          </HStack>
          <HStack>
            <Text fontSize="xs" color="teal.300">
              ({comments.length})
            </Text>
            <Box _hover={{ fill: "#0C87F5" }}>
              <BiComment
                cursor="pointer"
                onClick={handelCommentIcon}
                fill={colorCommentIcon(comments, user).length && "#0C87F5"}
              />
            </Box>
          </HStack>
        </HStack>
        <Box>
          <Text as="span" mr="2" fontSize="sm" color="teal.600">
            {/* {user.uid === postedBy.id ? "Me" : postedBy.name} */}
            {postedBy.name}
          </Text>
          <Text as="span" fontSize="xs" color="gray.400">
            {convertToReadableDate(createdAt)}
          </Text>
        </Box>
      </Flex>
      <CommentDrawer
        isOpen={user && isOpen}
        onClose={onClose}
        user={user}
        id={id}
        toast={toast}
      />
    </Flex>
  );
}
