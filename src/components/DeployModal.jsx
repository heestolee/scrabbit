import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export default function DeployModal({ isModalOpen, modalMessage, closeModal }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = modalMessage.split(": ")[1];
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error("복사 중 오류 발생:", err);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
      <ModalOverlay width="100%" height="100%" />
      <ModalContent>
        <ModalHeader>
          {modalMessage.includes("배포된")
            ? "배포 완료!"
            : modalMessage.includes("도메인")
              ? "도메인 중복 오류"
              : "배포 중 오류 발생"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalMessage}
          {modalMessage.includes("배포된") && (
            <Box>
              <Button
                bg="gray.300"
                onClick={handleCopy}
                h={8}
                w={10}
                ml={2}
                p={2.5}
              >
                <Image src="/copy.svg" alt="Copy Icon" width={96} height={96} />
              </Button>
              <p
                style={{
                  color: "green",
                  marginLeft: "10px",
                  minHeight: "24px",
                }}
              >
                {isCopied ? "주소가 복사되었습니다." : ""}
              </p>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
