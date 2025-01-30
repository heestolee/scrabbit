export default async function notionEvaluate(page) {
  await page.evaluate(async () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("/")) {
        img.setAttribute("src", `https://www.notion.site${src}`);
      }
    });

    const toggleButtons = document.querySelectorAll("div[role='button']");
    for (const button of toggleButtons) {
      if (button.getAttribute("aria-expanded") === "false") {
        button.click();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        box-sizing: border-box;
      }

      .notion-page-content {
        margin: 0 auto;
      }

      .notion-cursor-listener {
        width: 100% !important;
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

      div[role='button'] {
        cursor: pointer;
        position: relative;
        padding-left: 20px;
      }

      div[role='button']::before {
        content: '▶';
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: gray;
      }

      div[role='button'][aria-expanded='true']::before {
        content: '▼';
      }

      .notion-toggle-content {
        transition: max-height 0.3s ease-in-out;
        overflow: hidden;
        max-height: 1000px;
      }

      .notion-toggle-content.collapsed {
        max-height: 0;
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
