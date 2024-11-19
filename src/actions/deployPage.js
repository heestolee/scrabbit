"use server";

export async function deployPage({
  pageId,
  subdomain,
  deployMode,
  selectedBlocksHtml,
  snapshotHtml,
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const deploySetting =
    deployMode === "partial"
      ? {
          apiEndpoint: `${baseUrl}/api/deploy-partial`,
          deployContent: selectedBlocksHtml,
        }
      : { apiEndpoint: `${baseUrl}/api/deploy`, deployContent: snapshotHtml };

  try {
    const response = await fetch(deploySetting.apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageId,
        subdomain,
        deployMode,
        deployContent: deploySetting.deployContent,
      }),
    });

    const data = await response.json();
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
