export default async function defaultEvaluate(page) {
  await page.evaluate(async () => {
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
        computedStyle.position === "fixed" ||
        (typeof element.className === "string" &&
          element.className.includes("banner"))
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

    const images = Array.from(document.querySelectorAll("img[src*='.svg']"));
    for (const img of images) {
      try {
        const response = await fetch(img.src);
        const svgText = await response.text();
        const svgElement = new DOMParser().parseFromString(
          svgText,
          "image/svg+xml",
        ).documentElement;
        img.replaceWith(svgElement);
      } catch (err) {
        console.error("Failed to fetch SVG:", err.message);
      }
    }
  });
}
