"use server";

import { Mode } from "@/components/layout/MainContent";

export interface DeployPageInput {
  subdomain: string;
  deployMode: Mode;
  selectedBlocksHtml: { id: string; html: string }[];
  snapshotHtml: string | null;
}

export interface DeployPageResult {
  url?: string;
  error?: string;
  status: number;
}

export async function deployPage({
  subdomain,
  deployMode,
  selectedBlocksHtml,
  snapshotHtml,
}: DeployPageInput): Promise<DeployPageResult> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const deploySetting =
    deployMode === "partial"
      ? {
          apiEndpoint: `${baseUrl}/api/deployments/partial`,
          deployContent: selectedBlocksHtml,
        }
      : {
          apiEndpoint: `${baseUrl}/api/deployments/full`,
          deployContent: snapshotHtml,
        };

  try {
    const response = await fetch(deploySetting.apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subdomain,
        deployMode,
        deployContent: deploySetting.deployContent,
      }),
    });

    const data = (await response.json()) as { url?: string; error?: string };

    if (response.ok) {
      return { url: data.url, status: 200 };
    } else {
      return {
        error: data.error || "페이지 생성 실패",
        status: response.status,
      };
    }
  } catch (error) {
    console.error("페이지 생성 중 오류 발생:", error);
    return { error: "페이지 생성 실패", status: 500 };
  }
}
