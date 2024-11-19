export function createStyledLayout(html) {
  return `
    <div
      style="
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        align-items: center;
        justify-content: center;
        background-color: #e2e8f0;
      "
    >
      <div
        style="
          width: 90%;
          height: 80%;
          padding: 20px;
          background-color: white;
          overflow-y: scroll;
        "
      >
        <style>
          div::-webkit-scrollbar {
            width: 0.625rem;
          }
          div::-webkit-scrollbar-track {
            background: #cbd5e0;
            border-radius: 0.625rem;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #a0aec0;
            border-radius: 0.625rem;
          }
        </style>
        ${html}
      </div>
    </div>
  `;
}
