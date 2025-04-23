import Image from "next/image";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";

interface DeployModalProps {
  isModalOpen: boolean;
  modalMessage: string;
  statusCode: number | null;
  closeModal: () => void;
}

export default function DeployModal({
  isModalOpen,
  modalMessage,
  statusCode,
  closeModal,
}: DeployModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(modalMessage);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  };
  const getHeaderMessage = (statusCode: number | null) => {
    switch (statusCode) {
      case 200:
        return "페이지 생성 완료!";
      case 400:
        return "도메인 중복 오류";
      case 500:
        return "페이지 생성 중 오류 발생";
      default:
        return "예기치 못한 오류 발생";
    }
  };

  const closeModalWithReset = () => {
    setIsCopied(false);
    closeModal();
  };

  const isSuccess = statusCode === 200;
  const tooltipLabel = isCopied ? "복사 완료!" : "주소 복사";
  const headerMessage = getHeaderMessage(statusCode);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="md"
        overflow="hidden"
        maxW="420px"
        bg={isSuccess ? "gray.100" : "gray.700"}
        color={isSuccess ? "black" : "white"}
      >
        <ModalHeader p={4} textAlign="center">
          <Flex direction="column" align="center" gap={2}>
            {isSuccess ? (
              <CheckCircleIcon boxSize={8} color="green.400" />
            ) : (
              <WarningIcon boxSize={8} color="red.400" />
            )}
            <Text fontSize="lg" fontWeight="bold">
              {headerMessage}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody textAlign="center" pb={6}>
          {isSuccess ? (
            <Flex direction="column" align="center" gap={2}>
              <Text
                as="a"
                href={modalMessage}
                color="blue.500"
                fontWeight="bold"
                wordBreak="break-word"
              >
                {modalMessage}
              </Text>
              <Tooltip label={tooltipLabel} hasArrow>
                <Button
                  bg="gray.200"
                  _hover={{ bg: "gray.300" }}
                  onClick={handleCopy}
                  h="30px"
                  w="30px"
                  p={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="unset"
                  borderRadius="md"
                >
                  <Image
                    src="/copy.svg"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                  />
                </Button>
              </Tooltip>
            </Flex>
          ) : (
            <Text fontSize="md">{modalMessage}</Text>
          )}
        </ModalBody>
        <ModalFooter p={0}>
          <Button
            w="100%"
            h="50px"
            fontSize="lg"
            bg={isSuccess ? "gray.200" : "red.500"}
            _hover={{ bg: isSuccess ? "blue.200" : "red.600" }}
            onClick={closeModalWithReset}
            borderRadius="0 0 md md"
          >
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
