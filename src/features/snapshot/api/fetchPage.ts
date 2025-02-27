import { useMutation } from "@tanstack/react-query";

interface FetchPageResult {
  snapshotHtml: string | null;
}

const fetchPage = async (sourceUrl: string): Promise<FetchPageResult> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/snapshots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sourceUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "페이지를 가져오는 데 실패했습니다.");
  }

  return response.json();
};

export const useFetchPage = () => {
  return useMutation({
    mutationFn: fetchPage,
  });
};
