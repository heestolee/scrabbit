import { Mode } from "@/app/MainContent";

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

export const deployPage = async ({
  subdomain,
  deployMode,
  selectedBlocksHtml,
  snapshotHtml,
}: DeployPageInput): Promise<DeployPageResult> => {
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

  const response = await fetch(deploySetting.apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subdomain,
      deployMode,
      deployContent: deploySetting.deployContent,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "페이지 생성 실패");
  }

  return { url: data.url, status: 200 };
};
