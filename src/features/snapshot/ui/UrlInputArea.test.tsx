import { render, screen, fireEvent } from "@testing-library/react";
import UrlInputArea from "./UrlInputArea";

describe("UrlInputArea", () => {
  it("주소가 https://로 시작하지 않으면 보정 처리 후 onSubmitUrl 호출된다", async () => {
    const mockSubmit = jest.fn();

    render(
      <UrlInputArea
        sourceUrl="notion.so"
        onChangeSourceUrl={() => {}}
        onSubmitUrl={mockSubmit}
        isLoading={false}
      />,
    );

    const input = screen.getByPlaceholderText("웹사이트 주소를 입력해주세요.");
    fireEvent.submit(input.closest("form")!);

    expect(mockSubmit).toHaveBeenCalledWith("https://www.notion.so");
  });

  it("주소가 https://로 시작하면 그대로 onSubmitUrl이 호출된다", async () => {
    const mockSubmit = jest.fn();

    render(
      <UrlInputArea
        sourceUrl="https://example.com"
        onChangeSourceUrl={() => {}}
        onSubmitUrl={mockSubmit}
        isLoading={false}
      />,
    );

    const input = screen.getByPlaceholderText("웹사이트 주소를 입력해주세요.");
    fireEvent.submit(input.closest("form")!);

    expect(mockSubmit).toHaveBeenCalledWith("https://example.com");
  });
});
