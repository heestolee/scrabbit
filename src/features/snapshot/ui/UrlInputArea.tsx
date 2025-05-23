import React from "react";
import FormContainer from "@/shared/ui/FormContainer";
import InputField from "@/shared/ui/InputField";
import SubmitButton from "@/shared/ui/SubmitButton";

export interface UrlInputAreaProps {
  sourceUrl: string;
  onChangeSourceUrl: (value: string) => void;
  onSubmitUrl: (url: string) => Promise<void>;
  isLoading: boolean;
}

export default function UrlInputArea({
  sourceUrl,
  onChangeSourceUrl,
  onSubmitUrl,
  isLoading,
}: UrlInputAreaProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let normalizedUrl = sourceUrl.trim();
    if (!normalizedUrl.startsWith("https://")) {
      normalizedUrl = normalizedUrl.startsWith("www.")
        ? `https://${normalizedUrl}`
        : `https://www.${normalizedUrl}`;
    }

    try {
      await onSubmitUrl(normalizedUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        value={sourceUrl}
        onChange={(e) => onChangeSourceUrl(e.target.value)}
        placeholder="웹사이트 주소를 입력해주세요."
        isRequired
      />
      <SubmitButton
        label="불러오기"
        colorScheme="blue"
        isLoading={isLoading}
        minWidth="72px"
      />
    </FormContainer>
  );
}
