import { render, screen, fireEvent } from "@testing-library/react";
import ContentInteractionPanel from "./ContentInteractionPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/features/deploy/model/useDeployStore", () => ({
  useDeployStore: () => ({ markAsRendered: jest.fn() }),
}));

jest.mock("@/shared/ui/LoadingAnimation", () => () => (
  <div>show loading animation...</div>
));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("ContentInteractionPanel", () => {
  it("입력 및 제출 시 fetchSnapshot과 markAsRendered가 호출된다", () => {
    const fetchSnapshot = jest.fn();
    render(
      <ContentInteractionPanel
        snapshotHtml={null}
        fetchSnapshot={fetchSnapshot}
        isSnapshotFetching={false}
      />,
      { wrapper },
    );

    const input = screen.getByPlaceholderText("웹사이트 주소를 입력해주세요.");
    fireEvent.change(input, { target: { value: "notion.so" } });
    fireEvent.submit(input.closest("form")!);

    expect(fetchSnapshot).toHaveBeenCalledWith("https://www.notion.so");
  });

  it("로딩 중이면 로딩 애니메이션이 렌더링된다", () => {
    render(
      <ContentInteractionPanel
        snapshotHtml={null}
        fetchSnapshot={() => {}}
        isSnapshotFetching={true}
      />,
      { wrapper },
    );

    expect(screen.getByText("show loading animation...")).toBeInTheDocument();
  });

  it("snapshotHtml이 있으면 FetchedPageRenderer가 렌더링된다", () => {
    render(
      <ContentInteractionPanel
        snapshotHtml="<html><body><div>hello</div></body></html>"
        fetchSnapshot={() => {}}
        isSnapshotFetching={false}
      />,
      { wrapper },
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
