import { NextResponse } from "next/server";
import fs from "fs";

import takePartialSnapshot from "@/lib/puppeteerPartialSnapshot";
import removeUnselectedBlocksFromHtml from "@/lib/removeBlocks";

export async function POST(request) {
  try {
    const { pageId, subdomain, selectedBlocksHtml } = await request.json();

    const projectName = `notion-${subdomain}-${pageId}`;

    const domainCheckResponse = await fetch(
      `https://api.vercel.com/v9/projects/${projectName}/domains`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      },
    );

    if (domainCheckResponse.ok) {
      const domainData = await domainCheckResponse.json();
      if (
        domainData.domains &&
        domainData.domains.some(
          (domain) => domain.name === `${subdomain}.notiondrop.site`,
        )
      ) {
        return NextResponse.json(
          {
            error:
              "동일한 도메인이 이미 존재합니다.\n다른 서브도메인을 입력해주세요.",
          },
          { status: 400 },
        );
      }
    }

    const combinedHtml = selectedBlocksHtml
      .sort((a, b) => a.order - b.order)
      .map((block) => block.html)
      .join("\n");

    const vercelResponse = await fetch(
      "https://api.vercel.com/v13/deployments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          files: [
            {
              file: "index.html",
              data: combinedHtml,
            },
          ],
          target: "production",
          projectSettings: {
            devCommand: "npm run dev",
            installCommand: "npm install",
            buildCommand: "npm run build",
            outputDirectory: "",
            framework: "nextjs",
          },
        }),
      },
    );

    if (!vercelResponse.ok) {
      const errorData = await vercelResponse.json();
      console.error("Vercel API Error:", errorData);
      throw new Error("Failed to deploy on Vercel.");
    }

    const vercelData = await vercelResponse.json();

    const domainResponse = await fetch(
      `https://api.vercel.com/v5/projects/${vercelData.projectId}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: `${subdomain}.notiondrop.site` }),
      },
    );

    if (!domainResponse.ok) {
      const errorData = await domainResponse.json();
      console.error("Failed to set custom domain:", errorData);
      throw new Error("Failed to set custom domain.");
    }

    return NextResponse.json({ url: `http://${subdomain}.notiondrop.site` });
  } catch (error) {
    console.error("Partial deploy error:", error);
    return NextResponse.json(
      {
        error: error.message || "Partial deploy failed",
      },
      { status: 500 },
    );
  }
}
