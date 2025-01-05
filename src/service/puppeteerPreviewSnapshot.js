import puppeteer from "puppeteer";
import defaultEvaluate from "./evaluation/defaultEvaluate";
import notionEvaluate from "./evaluation/notionEvaluate";

export default async function takePreviewSnapshot(sourceUrl) {
  console.log("Puppeteer 시작:", sourceUrl);

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
    console.log("Puppeteer navigating to URL: ", sourceUrl);
    await page.goto(sourceUrl, {
      waitUntil: "networkidle2",
      timeout: 120000,
    });

    console.log("Puppeteer navigated successfully");
    await page.evaluateHandle("document.fonts.ready");
    console.log("font loaded");

    await page.waitForSelector("body");
    console.log("body loaded");

    switch (true) {
      case sourceUrl.includes("notion.site" || "notion.so"):
        await notionEvaluate(page);
        break;
      default:
        await defaultEvaluate(page);
        break;
    }

    await page.evaluate((baseURL) => {
      const elements = document.querySelectorAll("[src], [href]");
      elements.forEach((el) => {
        const src = el.getAttribute("src");
        const href = el.getAttribute("href");

        if (src && !src.startsWith("http")) {
          el.setAttribute("src", new URL(src, baseURL).href);
        }
        if (href && !href.startsWith("http")) {
          el.setAttribute("href", new URL(href, baseURL).href);
        }
      });
    }, sourceUrl);

    const snapshotHtml = await page.content();
    console.log("Puppeteer snapshot captured successfully");

    await browser.close();
    return snapshotHtml;
  } catch (error) {
    console.error("Puppeteer snapshot captured error:", error.message);
    await browser.close();
    throw new Error("Puppeteer snapshot failed");
  }
}
