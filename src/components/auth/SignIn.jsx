import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { ChakraLink } from "../layout/Header";
import Layout from "../layout/Layout";
import FormAtom from "../FormAtom";
import { useAuth } from "../../hooks/useAuth";
import EmailResetModal from "./EmailResetModal";
import { schemaSignIn } from "../../utils/validationSchema";

export default function SignIn() {
  const [emailResendError, setEmailResendError] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, setError } = useForm({
    resolver: yupResolver(schemaSignIn),
  });
  const { signin, sendPasswordResetEmail } = useAuth();
  const history = useHistory();
  const formValues = ["Email", "Password"];

  const onSubmit = ({ Password, Email }) => {
    signin(Email, Password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError("server", {
          type: "credential",
          message: err && err,
        });
      });
  };

  const sendEmail = (email) => {
    sendPasswordResetEmail(email)
      .then(() => {
        onClose();
        toast({
          position: "top",
          title: "Email sent.",
          description: "We've send email to your email address.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setEmailResendError(err.message);
      });
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
      >
        <Text fontSize="2xl" align="center">
          Login
        </Text>
        {formValues.map((name) => (
          <>
            <FormAtom name={name} register={register} errors={errors} />
          </>
        ))}
        <Text color="red.300" letterSpacing="1px">
          {errors.server && errors.server?.message?.message}
        </Text>
        <Flex align="center" w="100%">
          <Button mt={4} colorScheme="teal" type="submit">
            Login
          </Button>
          <Flex direction="column" mt="4">
            <ChakraLink ml="4" to="/signUp">
              <Text
                fontSize="12px"
                color="gray.500"
                _hover={{ color: "teal.500", textDecoration: "underLine" }}
              >
                Need to Create a Account?
              </Text>
            </ChakraLink>

            <Text
              ml="4"
              fontSize="12px"
              color="gray.500"
              _hover={{ color: "teal.500", textDecoration: "underLine" }}
              cursor="pointer"
              onClick={onOpen}
            >
              Forget Password?
            </Text>
          </Flex>
        </Flex>
      </Box>
      <EmailResetModal
        isOpen={isOpen}
        onClose={onClose}
        sendEmail={sendEmail}
        error={emailResendError}
      />
    </Layout>
  );
}
