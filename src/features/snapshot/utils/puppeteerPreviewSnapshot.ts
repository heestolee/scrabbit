import puppeteer, { Page } from "puppeteer";
import defaultEvaluate from "./evaluation/defaultEvaluate";
import notionEvaluate from "./evaluation/notionEvaluate";

const isNotionPage = (url: string): boolean =>
  url.includes("notion.site") || url.includes("notion.so");

const logStep = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[PUPPETEER] ${message}`);
  }
};

const evaluateSnapshotFor = async (page: Page, url: string): Promise<void> => {
  if (isNotionPage(url)) {
    await notionEvaluate(page);
  } else {
    await defaultEvaluate(page);
  }
};

export default async function takePreviewSnapshot(
  sourceUrl: string,
): Promise<string> {
  logStep("Launching Puppeteer...");

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

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      request.continue({
        headers: {
          ...request.headers(),
          Origin:
            process.env.NODE_ENV === "production"
              ? "https://www.scrabbit.site"
              : "http://localhost:3000",
        },
      });
    });

    logStep(`Navigating to ${sourceUrl}`);
    await page.goto(sourceUrl, { waitUntil: "networkidle2", timeout: 120000 });

    await page.evaluateHandle("document.fonts.ready");
    logStep("Fonts loaded");

    await page.waitForSelector("body");
    logStep("Body loaded");

    await evaluateSnapshotFor(page, sourceUrl);

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
    logStep("Snapshot captured successfully");

    return snapshotHtml;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[PUPPETEER ERROR]", message);
    throw new Error("Puppeteer snapshot failed");
  } finally {
    await browser.close();
  }
}
