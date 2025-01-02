"use server";

export interface FetchPageResult {
  snapshotHtml: string | null;
}

export async function fetchPage(sourceUrl: string): Promise<FetchPageResult> {
  const pageId = sourceUrl.split("/").pop() || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/puppeteer-preview-snapshot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "페이지를 가져오는 데 실패했습니다.",
      );
    }

    const data = (await response.json()) as { snapshotHtml: string | null };

    return { snapshotHtml: data.snapshotHtml || null };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "fetchPage에서 예기치 않은 오류가 발생했습니다.";
    console.error("fetchPage 에러:", errorMessage);
    throw new Error(errorMessage);
  }
}
