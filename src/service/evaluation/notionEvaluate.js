export default async function notionEvaluate(page) {
  await page.evaluate(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("/")) {
        img.setAttribute("src", `https://www.notion.site${src}`);
      }
    });
  });

  await page.evaluate(() => {
    const targetDiv = Array.from(document.querySelectorAll("div")).find(
      (div) => div.style.order === "3" && div.style.overflow === "hidden",
    );
    if (targetDiv) {
      targetDiv.style.overflow = "unset";
    }

    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        box-sizing: border-box;
      }

      .notion-page-content {
        max-width: 900px;
        margin: 0 auto;
        transform: zoom(0.9);
        transform-origin: top center;
      }

      .notion-cursor-listener {
        width: 100% !important;
      }

      .notion-scroller.vertical {
        overflow: unset !important;
      }

      .pseudoSelection {
        display: none !important;
      }

      .layout {
        padding: 0 0 0 2rem;
      }

      .notion-topbar {
        display: none;
      }

      .notion-numbered_list-block,
      .notion-bulleted_list-block {
        width: auto !important;
        height: auto !important;
      }

      .notion-bulleted_list-block {
        list-style-type: disc;
        margin-left: 20px;
        display: list-item;
      }

      .notion-numbered_list-block {
        list-style-type: decimal;
        margin-left: 20px;
        display: list-item;
      }

      ol {
        list-style-type: none;
        counter-reset: list-counter;
        padding-left: 30px;
      }

      ol li {
        counter-increment: list-counter;
        margin-bottom: 10px;
      }

      ol li::before {
        content: counter(list-counter) ". ";
        margin-right: 5px;
      }

      ul {
        list-style-type: disc;
        padding-left: 30px;
      }

      ul li {
        margin-bottom: 10px;
      }

      @media (max-width: 1200px) {
        .notion-page-content {
          padding: 10px;
          max-width: 95%;
        }
      }

      @media (max-width: 768px) {
        .notion-page-content {
          padding: 5px;
          max-width: 90%;
        }
      }
    `;
    document.head.appendChild(style);
  });
}
