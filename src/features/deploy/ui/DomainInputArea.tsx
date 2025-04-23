import React from "react";
import FormContainer from "@/shared/ui/FormContainer";
import InputField from "@/shared/ui/InputField";
import SubmitButton from "@/shared/ui/SubmitButton";

interface DomainInputAreaProps {
  subdomain: string;
  onChangeSubdomain: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function DomainInputArea({
  subdomain,
  onChangeSubdomain,
  onSubmit,
  isLoading,
}: DomainInputAreaProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        value={subdomain}
        onChange={(e) => onChangeSubdomain(e.target.value)}
        placeholder="생성할 서브 주소 입력"
        prefix="https://"
        suffix=".scrabbit.site"
        px="2"
      />
      <SubmitButton label="생성" colorScheme="green" isLoading={isLoading} />
    </FormContainer>
  );
}
