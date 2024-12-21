import React from "react";
import { Input, FormControl } from "@chakra-ui/react";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isRequired?: boolean;
  prefix?: string;
  suffix?: string;
}

export default function InputField({
  value,
  onChange,
  placeholder,
  isRequired = false,
  prefix = "",
  suffix = "",
}: InputFieldProps) {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      bg="white"
      isRequired={isRequired}
      borderColor="gray.300"
      borderRadius="md"
      _focus={{ borderColor: "blue.500" }}
    >
      {prefix && <span>{prefix}</span>}
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        borderColor="gray.300"
        borderRadius="md"
        _focus={{ borderColor: "blue.500" }}
        fontSize="sm"
      />
      {suffix && <span>{suffix}</span>}
    </FormControl>
  );
}