import puppeteer from "puppeteer";
import defaultEvaluate from "./evaluation/defaultEvaluate";
import notionEvaluate from "./evaluation/notionEvaluate";

export default async function takePreviewSnapshot(notionUrl) {
  console.log("Puppeteer 시작:", notionUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  try {
    console.log("Puppeteer 페이지 이동 중:", notionUrl);
    await page.goto(notionUrl, {
      waitUntil: "networkidle2",
      timeout: 120000,
    });

    console.log("Puppeteer 페이지 이동 완료");
    await page.evaluateHandle("document.fonts.ready");
    console.log("폰트 로드 완료");

    switch (true) {
      case notionUrl.includes("notion.site"):
        await notionEvaluate(page);
        break;
      default:
        await defaultEvaluate(page);
        break;
    }

    const snapshotHtml = await page.content();
    console.log("Puppeteer 스냅샷 성공");

    await browser.close();
    return snapshotHtml;
  } catch (error) {
    console.error("Puppeteer 스냅샷 오류 발생:", error.message);
    await browser.close();
    throw new Error("Puppeteer 스냅샷 생성 실패");
  }
}
