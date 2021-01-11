import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export default function FormAtom({
  name,
  register,
  errors,
  textArea,
  defaultValue,
}) {
  return (
    <FormControl isRequired zIndex="10">
      <FormLabel>{name}</FormLabel>
      {!textArea && (
        <Input
          defaultValue={defaultValue}
          placeholder={name}
          ref={register}
          name={name}
          type={name === "Confirm Password" ? "password" : name}
        />
      )}

      {textArea && (
        <Textarea
          ref={register}
          name={name}
          defaultValue={defaultValue}
          placeholder="Keep it simple and write what in your mind"
        />
      )}

      <Text color="red.300" letterSpacing="1px">
        {errors[`${name}`]?.message}
      </Text>
    </FormControl>
  );
}
