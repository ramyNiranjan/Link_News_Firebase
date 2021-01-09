import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Flex bg="gray.900" w="100vw" p="2" color="white" justifyContent="center">
      <Text fontSize="md" color="white" cursor="pointer">
        Made by Ramy
      </Text>
    </Flex>
  );
}
