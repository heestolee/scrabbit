import { render, screen, fireEvent, act } from "@testing-library/react";
import DeployModal from "@/features/deploy/ui/DeployModal";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("DeployModal", () => {
  it("성공 상태일 때 메시지와 복사 버튼이 렌더링된다", () => {
    render(
      <DeployModal
        isModalOpen={true}
        modalMessage="https://test.scrabbit.site"
        statusCode={200}
        closeModal={jest.fn()}
      />,
    );

    expect(screen.getByText("페이지 생성 완료!")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /https:\/\/test.scrabbit.site/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Copy Icon")).toBeInTheDocument();
  });

  it("복사 버튼 클릭 시 navigator.clipboard.writeText가 호출된다", async () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    render(
      <DeployModal
        isModalOpen={true}
        modalMessage="https://test.scrabbit.site"
        statusCode={200}
        closeModal={jest.fn()}
      />,
    );

    const button = screen.getByAltText("Copy Icon").closest("button")!;

    await act(async () => {
      fireEvent.click(button);
    });

    expect(clipboardSpy).toHaveBeenCalledWith("https://test.scrabbit.site");
  });

  it("오류 상태일 경우 복사 버튼이 보이지 않는다", () => {
    render(
      <DeployModal
        isModalOpen={true}
        modalMessage="에러 발생"
        statusCode={500}
        closeModal={jest.fn()}
      />,
    );

    expect(screen.getByText("페이지 생성 중 오류 발생")).toBeInTheDocument();
    expect(screen.queryByAltText("Copy Icon")).not.toBeInTheDocument();
  });
});
