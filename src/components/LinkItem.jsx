import {
  Box,
  Flex,
  Text,
  HStack,
  StackDivider,
  useDisclosure,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import React from "react";
import {
  getDomain,
  handelLike,
  colorLikeIcon,
  colorCommentIcon,
} from "../utils/helper";
import { useAuth } from "../hooks/useAuth";
import CommentDrawer from "./CommentDrawer";
import LikeList from "./LikeCommentList";

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
      toast({
        title: "You are not logged in",
        description: "Please login or create an account to  like or comment ",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    onOpen();
  };

  return (
    <Flex direction="column" bg="gray.100" w="250" justify="space-between">
      <Box p="2">
        <Flex justifyContent="space-between" align="center">
          <Box fontSize="md" fontWeight="bold">
            {title}
          </Box>
          <BiDotsHorizontalRounded />
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

      <Flex
        justify="space-between"
        align="baseline"
        direction={{ base: "column", md: "row" }}
        p="2"
      >
        <HStack
          spacing="10px"
          divider={<StackDivider borderColor="gray.200" />}
          mt="2"
        >
          <HStack>
            <Tooltip
              color="black"
              shouldWrapChildren
              bg="white"
              label="Clicke here to see like list"
            >
              <Text
                onClick={onOpenLike}
                fontSize="xs"
                color="teal.300"
                cursor="pointer"
                _hover={{ color: "teal.100" }}
              >
                ({likes.length})
              </Text>
            </Tooltip>
            <LikeList list={likes} onClose={onCloseLike} isOpen={isOpenLike} />
            <Tooltip
              color="black"
              shouldWrapChildren
              bg="white"
              label="Click here to like this post"
            >
              <BiLike
                cursor="pointer"
                onClick={() => handelLike(user, id, toast)}
                fill={colorLikeIcon(likes, user).length && "#0C87F5"}
              />
            </Tooltip>
          </HStack>
          <HStack>
            <Text fontSize="xs" color="teal.300">
              ({comments.length})
            </Text>

            <Tooltip
              color="black"
              shouldWrapChildren
              bg="white"
              label="Click here to post a comment"
            >
              <BiComment
                cursor="pointer"
                onClick={handelCommentIcon}
                fill={colorCommentIcon(comments, user).length && "#0C87F5"}
              />
            </Tooltip>
          </HStack>
        </HStack>
        <Box>
          <Text as="span" mr="2" fontSize="sm" color="gray.400">
            {postedBy.name}
          </Text>
          <Text as="span" fontSize="xs" color="gray.400">
            3 hours ago
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
