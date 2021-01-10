import { Box, Button, Flex, Text, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { schemaCreateLink } from "../utils/validationSchema";
import FormAtom from "./FormAtom";
import Layout from "./layout/Layout";

function CreateLink() {
  const { user } = useAuth();
  console.log(user);
  const { id } = useParams();
  const docRef = firestore.collection("links").doc(id);
  const [idValue, setIdValue] = useState("");
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schemaCreateLink),
  });
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const history = useHistory();

  useEffect(() => {
    setIdValue(id);
    settingEditValue();
  }, [id]);

  const settingEditValue = () => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const { description, link, title, createdAt } = doc.data();
        console.log(description, link, title, createdAt);
        setDesc(description);
        setTitle(title);
        setLink(link);
      }
    });
  };

  const onSubmit = ({ Title, Description, Link }) => {
    console.log(Title, Description, Link);
    console.log(user);

    if (idValue) {
      docRef.get().then((doc) => {
        if (doc.exists) {
          docRef.update({
            title: Title,
            description: Description,
            link: Link,
          });
        }
      });
      history.push("/");
      return;
    }

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
          {idValue ? "Edit the topic" : " Create a Topic"}
        </Text>
        <Stack spacing={3}>
          <FormAtom
            defaultValue={idValue ? title : ""}
            name="Title"
            register={register}
            errors={errors}
          />
          <FormAtom
            name="Description"
            register={register}
            errors={errors}
            textArea
            defaultValue={idValue ? desc : ""}
          />
          <FormAtom
            defaultValue={idValue ? link : ""}
            name="Link"
            register={register}
            errors={errors}
          />
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
