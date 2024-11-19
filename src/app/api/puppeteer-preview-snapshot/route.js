import { NextResponse } from "next/server";
import takePreviewSnapshot from "@/service/puppeteerPreviewSnapshot";

export async function POST(request) {
  try {
    const { notionUrl } = await request.json();

    if (!notionUrl) {
      throw new Error("Notion URL이 제공되지 않았습니다.");
    }

    const snapshotHtml = await takePreviewSnapshot(notionUrl);

    return NextResponse.json({ snapshotHtml });
  } catch (error) {
    console.error("Puppeteer 스냅샷 생성 중 오류 발생:", error.message);
    return NextResponse.json(
      { error: "Puppeteer 스냅샷 생성 실패" },
      { status: 500 },
    );
  }
}
