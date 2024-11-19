export default async function defaultEvaluate(page) {
  await page.evaluate(() => {
    function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    }

    const elements = document.querySelectorAll("body *");
    elements.forEach((element) => {
      element.setAttribute("data-block-id", `${generateUUID()}`);
      const computedStyle = window.getComputedStyle(element);
      if (
        computedStyle.position === "absolute" ||
        computedStyle.position === "fixed"
      ) {
        element.style.display = "none";
      } else {
        let inlineStyle = "";
        for (let i = 0; i < computedStyle.length; i++) {
          const property = computedStyle[i];
          inlineStyle += `${property}: ${computedStyle.getPropertyValue(property)}; `;
        }
        element.setAttribute("style", inlineStyle);
      }
    });
  });
}
