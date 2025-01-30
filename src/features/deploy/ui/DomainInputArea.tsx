import React from "react";
import FormContainer from "@/shared/ui/FormContainer";
import InputField from "@/shared/ui/InputField";
import SubmitButton from "@/shared/ui/SubmitButton";

interface DomainInputAreaProps {
  subdomain: string;
  setSubdomain: React.Dispatch<React.SetStateAction<string>>;
  handleDeploy: () => void;
}

export default function DomainInputArea({
  subdomain,
  setSubdomain,
  handleDeploy,
}: DomainInputAreaProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDeploy();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
        placeholder="생성할 서브 주소 입력"
        prefix="https://"
        suffix=".scrabbit.site"
        px="2"
      />
      <SubmitButton label="생성" colorScheme="green" />
    </FormContainer>
  );
}
