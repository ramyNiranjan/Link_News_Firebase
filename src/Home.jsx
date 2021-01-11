import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Layout from "./components/layout/Layout";
import LinkItem from "./components/LinkItem";
import useFirestore from "./hooks/useFirestore";

export default function Home() {
  const { docs } = useFirestore("links");
  return (
    <Layout>
      <Box p="4" mt="4">
        <SimpleGrid minChildWidth="200px" spacing="10px">
          {docs &&
            docs.map((item) => <LinkItem key={item.createdAt} {...item} />)}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
