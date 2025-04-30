import { render, screen, fireEvent } from "@testing-library/react";
import MainContent from "./MainContent";
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

describe("MainContent", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    (deployStore.useDeployStore as unknown as jest.Mock).mockReturnValue({
      isRendered: true,
      resetDeployState: jest.fn(),
    });
    (snapshotStore.useSnapshotStore as unknown as jest.Mock).mockReturnValue({
      resetSelectedBlocks: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({ replace: jest.fn() });
  });

  it("로고 클릭 시 reset 함수들이 호출된다", () => {
    (snapshotData.useSnapshotData as unknown as jest.Mock).mockReturnValue({
      snapshotHtml: null,
      fetchSnapshot: jest.fn(),
      isSnapshotFetching: false,
    });

    render(<MainContent />, { wrapper });
    const logo = screen.getByRole("img");
    fireEvent.click(logo);

    expect(deployStore.useDeployStore().resetDeployState).toHaveBeenCalled();
    expect(
      snapshotStore.useSnapshotStore().resetSelectedBlocks,
    ).toHaveBeenCalled();
  });

  it("snapshotHtml과 isRendered가 true일 때 DeploymentPanel이 렌더링된다", () => {
    (snapshotData.useSnapshotData as unknown as jest.Mock).mockReturnValue({
      snapshotHtml: "<div>html</div>",
      fetchSnapshot: jest.fn(),
      isSnapshotFetching: false,
    });

    render(<MainContent />, { wrapper });
    expect(screen.getByText("html")).toBeInTheDocument();
  });
});
