import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { ChakraLink } from "./Header";
import Layout from "./Layout";
import FormAtom from "./FormAtom";
import { useAuth } from "../hooks/useAuth";
import { schema } from "../utils/signUpSchema";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const { signup } = useAuth();
  const history = useHistory();
  const formValues = ["Name", "Email", "Password", "Confirm Password"];

  const onSubmit = ({ Email, Name, Password }) => {
    signup(Email, Password, Name);
    history.push("/");
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
          Registor
        </Text>
        {formValues.map((name) => (
          <FormAtom name={name} register={register} errors={errors} />
        ))}

        <Flex align="baseline" w="100%">
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
          <ChakraLink ml="4" to="/signIn">
            <Text
              fontSize="12px"
              color="gray.500"
              _hover={{ color: "teal.500", textDecoration: "underLine" }}
            >
              Already Have a Account?
            </Text>
          </ChakraLink>
        </Flex>
      </Box>
    </Layout>
  );
}
