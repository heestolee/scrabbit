import { render, screen, fireEvent } from "@testing-library/react";
import DomainInputArea from "@/features/deploy/ui/DomainInputArea";

describe("DomainInputArea", () => {
  it("폼 제출 시 onSubmit이 호출된다", () => {
    const handleSubmit = jest.fn();
    render(
      <DomainInputArea
        subdomain="test"
        onChangeSubdomain={() => {}}
        onSubmit={handleSubmit}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: "생성" });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
