import { Box, Heading, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { ChakraLink } from "./layout/Header";
import Layout from "./layout/Layout";

export default function About() {
  const { user } = useAuth();
  return (
    <Layout>
      <Box p="6" size="3xl" letterSpacing="1">
        <Heading as="h1" color="teal.300" align="center" mb="4">
          Welcome
        </Heading>
        <Box fontSize="lg" fontWeight="bold" mb="4">
          Hey my name is <Text as="mark">Ramy 😎</Text> i'm a
          <Text as="mark"> fullstack develeoper💻</Text>
        </Box>
        <Box color="gray.900" mb="4">
          Link News is a platform where all users can share their daily news
          with others by linking to a news feed on another news site while users
          can participate in others' news feeds by liking or commenting on the
          feed. I created this platform so that the hot topic on the internet
          can be easily shared. At the moment it looks very primitive but in the
          near future I will add more features and improve UX more.
        </Box>
        <Box mb="4">
          <Text fontWeight="bold" fontSize="lg">
            How to use this platform is very easy🤷‍♂️
          </Text>
          <UnorderedList>
            <ListItem>Create an account</ListItem>
            <ListItem>
              After creating the account you can start posting by clicking{" "}
              <ChakraLink
                _hover={{ color: "teal.500", textDecoration: "underLine" }}
                color="teal.200"
                to={user ? "/create" : "/signIn"}
              >
                Create topic
              </ChakraLink>
            </ListItem>
            <ListItem>
              You can interract with others post by liking or posting comments
            </ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Features ⚙⚒⚙
          </Text>
          <UnorderedList>
            <ListItem>Create,delete,update feeds📝</ListItem>
            <ListItem>Like,unlike,post and upadate comment👍✍</ListItem>
          </UnorderedList>
        </Box>
        <Box mt="4">
          <Text as="mark">
            Finally, do not forget to spread the word about my platform 😉😍
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}
