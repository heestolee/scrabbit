import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deployPage,
  DeployPageInput,
  DeployPageResult,
} from "@/features/deploy/api/deployPage";

export function useDeploy() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const { mutate: deploy, isPending: isDeploying } = useMutation<
    DeployPageResult,
    Error,
    DeployPageInput
  >({
    mutationFn: (data) => deployPage(data),
    onSuccess: ({ url }) => {
      setModalMessage(url ?? "배포 성공");
      setStatusCode(200);
      setIsModalOpen(true);
      queryClient.invalidateQueries({ queryKey: ["snapshotHtml"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "페이지 생성 중 오류 발생";
      setModalMessage(errorMessage);
      setStatusCode(500);
      setIsModalOpen(true);
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    deploy,
    isDeploying,
    isModalOpen,
    modalMessage,
    statusCode,
    closeModal,
  };
}
