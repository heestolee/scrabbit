import puppeteer from "puppeteer";
import defaultEvaluate from "./evaluation/defaultEvaluate";
import notionEvaluate from "./evaluation/notionEvaluate";

export default async function takePreviewSnapshot(sourceUrl) {
  console.log("Puppeteer start:", sourceUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();

  try {
    console.log("Setting up request interception...");
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const headers = request.headers();
      headers["Origin"] =
        process.env.NODE_ENV === "production"
          ? "https://www.scrabbit.site"
          : "http://localhost:3000";
      request.continue({ headers });
    });

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
      case sourceUrl.includes("notion.site") || sourceUrl.includes("notion.so"):
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
