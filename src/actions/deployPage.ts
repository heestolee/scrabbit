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
      return { url: data.url };
    } else {
      return { error: data.error || "배포 실패" };
    }
  } catch (error) {
    console.error("배포 중 오류 발생:", error);
    return { error: "배포 실패" };
  }
}
