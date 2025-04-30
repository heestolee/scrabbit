import { render, screen, fireEvent } from "@testing-library/react";
import FetchedPageRenderer from "./FetchedPageRenderer";
import * as deployStore from "@/features/deploy/model/useDeployStore";
import * as snapshotStore from "@/features/snapshot/model/useSnapshotStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/features/deploy/model/useDeployStore", () => ({
  useDeployStore: jest.fn(),
}));

jest.mock("@/features/snapshot/model/useSnapshotStore", () => ({
  useSnapshotStore: jest.fn(),
}));

const createWrapper = () => ({
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  ),
});

describe("FetchedPageRenderer", () => {
  beforeEach(() => {
    (deployStore.useDeployStore as unknown as jest.Mock).mockReturnValue({
      deployMode: "partial",
    });

    (snapshotStore.useSnapshotStore as unknown as jest.Mock).mockReturnValue({
      selectedBlocksHtml: [],
      setSelectedBlocksHtml: jest.fn(),
    });
  });

  it("snapshotHtml이 없으면 fallback 메시지를 보여준다", () => {
    const { wrapper } = createWrapper();
    render(<FetchedPageRenderer snapshotHtml={null} />, { wrapper });
    expect(screen.getByText("No data available.")).toBeInTheDocument();
  });

  it("snapshotHtml이 있으면 콘텐츠가 렌더링된다", () => {
    const { wrapper } = createWrapper();
    render(
      <FetchedPageRenderer snapshotHtml="<div data-block-id='1'>test content</div>" />,
      { wrapper },
    );
    expect(screen.getByText("test content")).toBeInTheDocument();
  });

  it("블록을 클릭하면 setSelectedBlocksHtml이 호출된다", () => {
    const mockSetSelected = jest.fn();
    (snapshotStore.useSnapshotStore as unknown as jest.Mock).mockReturnValue({
      selectedBlocksHtml: [],
      setSelectedBlocksHtml: mockSetSelected,
    });

    const { wrapper } = createWrapper();
    render(
      <FetchedPageRenderer snapshotHtml="<div data-block-id='123'>Click Me</div>" />,
      { wrapper },
    );

    fireEvent.click(screen.getByText("Click Me"));
    expect(mockSetSelected).toHaveBeenCalled();
  });
});
