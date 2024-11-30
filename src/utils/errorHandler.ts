export const handleError = (
  error: unknown,
): { title: string; description: string } => {
  if (error instanceof Error) {
    return {
      title: "오류 발생",
      description: error.message || "알 수 없는 오류가 발생했습니다.",
    };
  }

  return {
    title: "알 수 없는 에러",
    description: "알 수 없는 에러가 발생했습니다.",
  };
};
