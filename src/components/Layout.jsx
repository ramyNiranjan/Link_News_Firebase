import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ otherProps, children }) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      minH="100vh"
      {...otherProps}
    >
      <Header />
      <Box as="main" flexGrow="1" w="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
