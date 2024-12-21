import React from "react";
import FormContainer from "@/components/shared/FormContainer";
import InputField from "@/components/shared/InputField";
import SubmitButton from "@/components/shared/SubmitButton";

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
        placeholder="배포 URL 입력"
        prefix="https://"
        suffix=".scrabbit.site"
      />
      <SubmitButton label="배포" colorScheme="green" />
    </FormContainer>
  );
}
