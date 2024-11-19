import { NextResponse } from "next/server";
import takePreviewSnapshot from "@/service/puppeteerPreviewSnapshot";

export async function POST(request) {
  try {
    const { sourceUrl } = await request.json();

    if (!sourceUrl) {
      throw new Error("가져올 URL이 입력되지 않았습니다.");
    }

    const snapshotHtml = await takePreviewSnapshot(sourceUrl);

    return NextResponse.json({ snapshotHtml });
  } catch (error) {
    console.error("Puppeteer 스냅샷 생성 중 오류 발생:", error.message);
    return NextResponse.json(
      { error: "Puppeteer 스냅샷 생성 실패" },
      { status: 500 },
    );
  }
}
