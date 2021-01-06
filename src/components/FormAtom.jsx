import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";

export default function FormAtom({ name, register, errors }) {
  return (
    <FormControl isRequired zIndex="10">
      <FormLabel>{name}</FormLabel>
      <Input
        placeholder={name}
        ref={register}
        name={name}
        type={name === "Confirm Password" ? "password" : name}
      />
      <Text color="red.300" letterSpacing="1px">
        {errors[`${name}`]?.message}
      </Text>
    </FormControl>
  );
}
