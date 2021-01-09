import { Box, Button, Flex, Text, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { firestore } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { schemaCreateLink } from "../utils/validationSchema";
import FormAtom from "./FormAtom";
import Layout from "./layout/Layout";

function CreateLink() {
  const { user } = useAuth();
  console.log(user);

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schemaCreateLink),
  });

  const history = useHistory();

  const onSubmit = ({ Title, Description, Link }) => {
    console.log(Title, Description, Link);
    console.log(user);
    const newTopic = {
      title: Title,
      description: Description,
      link: Link,
      postedBy: {
        id: user.uid,
        name: user.displayName,
      },
      likes: [],
      comments: [],
      createdAt: Date.now(),
    };
    firestore
      .collection("links")
      .add(newTopic)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Box
        as="form"
        w={[250, 300, 500]}
        mt="50px"
        mx="auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        mb="4"
      >
        <Text fontSize="2xl" align="center">
          Create a Topic
        </Text>
        <Stack spacing={3}>
          <FormAtom name="Title" register={register} errors={errors} />
          <FormAtom
            name="Description"
            register={register}
            errors={errors}
            textArea
          />
          <FormAtom name="Link" register={register} errors={errors} />
        </Stack>
        <Flex align="baseline" w="100%">
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
}

export default CreateLink;
