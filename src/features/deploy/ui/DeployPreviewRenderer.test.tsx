import { render, screen } from "@testing-library/react";
import DeployPreviewRenderer from "@/features/deploy/ui/DeployPreviewRenderer";

describe("DeployPreviewRenderer", () => {
  it("full 모드일 경우 전체선택 모드를 알리는 메시지가 표시된다", () => {
    render(<DeployPreviewRenderer deployMode="full" selectedBlocksHtml={[]} />);
    expect(screen.getByText("전체선택 모드입니다.")).toBeInTheDocument();
  });

  it("partial 모드에서 선택한 블럭이 없으면 부분선택 모드를 알리는 메시지가 표시된다", () => {
    render(
      <DeployPreviewRenderer deployMode="partial" selectedBlocksHtml={[]} />,
    );
    expect(screen.getByText("부분선택 모드입니다.")).toBeInTheDocument();
  });

  it("partial 모드이고 선택한 블럭이 있으면 블럭을 렌더링한다", () => {
    render(
      <DeployPreviewRenderer
        deployMode="partial"
        selectedBlocksHtml={[{ id: "1", html: "<p>test</p>" }]}
      />,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
