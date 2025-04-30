import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainContent from "@/app/MainContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as deployStore from "@/features/deploy/model/useDeployStore";
import * as snapshotStore from "@/features/snapshot/model/useSnapshotStore";
import * as snapshotData from "@/features/snapshot/model/useSnapshotData";
import { useRouter } from "next/navigation";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("@/features/deploy/model/useDeployStore", () => ({
  useDeployStore: jest.fn(),
}));

jest.mock("@/features/snapshot/model/useSnapshotStore", () => ({
  useSnapshotStore: jest.fn(),
}));

jest.mock("@/features/snapshot/model/useSnapshotData", () => ({
  useSnapshotData: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ContentInteractionPanel 통합 테스트", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  const mockSnapshotHtml =
    "<div data-block-id='test-block'>content block</div>";
  const fetchSnapshot = jest.fn();
  const markAsRendered = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: jest.fn() });

    (deployStore.useDeployStore as unknown as jest.Mock).mockReturnValue({
      isRendered: true,
      resetDeployState: jest.fn(),
      markAsRendered,
      deployMode: "partial",
    });

    (snapshotStore.useSnapshotStore as unknown as jest.Mock).mockReturnValue({
      resetSelectedBlocks: jest.fn(),
      selectedBlocksHtml: [],
      setSelectedBlocksHtml: jest.fn(),
    });

    (snapshotData.useSnapshotData as unknown as jest.Mock).mockReturnValue({
      snapshotHtml: mockSnapshotHtml,
      fetchSnapshot,
      isSnapshotFetching: false,
    });
  });

  it("주소 입력 후 제출하면 fetchSnapshot과 markAsRendered가 호출되고, HTML이 렌더링된다", async () => {
    render(<MainContent />, { wrapper });

    const input = screen.getByPlaceholderText("웹사이트 주소를 입력해주세요.");
    fireEvent.change(input, { target: { value: "notion.so" } });
    fireEvent.submit(input.closest("form")!);

    expect(fetchSnapshot).toHaveBeenCalledWith("https://www.notion.so");
    expect(markAsRendered).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("content block")).toBeInTheDocument();
    });
  });
});
