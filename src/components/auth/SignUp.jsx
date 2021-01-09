import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { ChakraLink } from "../layout/Header";
import Layout from "../layout/Layout";
import FormAtom from "../FormAtom";
import { useAuth } from "../../hooks/useAuth";
import { schemaSignUp } from "../../utils/validationSchema";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schemaSignUp),
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
        {formValues.map((name, idx) => (
          <FormAtom key={idx} name={name} register={register} errors={errors} />
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
