import { renderHook, act, waitFor } from "@testing-library/react";
import { useSnapshotData } from "@/features/snapshot/model/useSnapshotData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/features/snapshot/api/fetchPage", () => ({
  fetchPage: jest.fn(),
}));

import { fetchPage } from "@/features/snapshot/api/fetchPage";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSnapshotData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchSnapshot이 fetchPage를 호출하고 snapshotHtml을 queryClient에 저장한다", async () => {
    const mockHtml = "<div>hello</div>";
    (fetchPage as jest.Mock).mockResolvedValue(mockHtml);

    const { result } = renderHook(() => useSnapshotData(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.fetchSnapshot("https://example.com");
    });

    await waitFor(() => {
      expect(result.current.snapshotHtml).toBe(mockHtml);
    });
  });

  it("fetchPage가 null을 반환하면 snapshotHtml도 null이다", async () => {
    (fetchPage as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useSnapshotData(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.fetchSnapshot("https://example.com");
    });

    await waitFor(() => {
      expect(result.current.snapshotHtml).toBeNull();
    });
  });

  it("updateSelectedBlocks를 통해 selectedBlocksHtml 상태를 변경할 수 있다", () => {
    const { result } = renderHook(() => useSnapshotData(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateSelectedBlocks([{ id: "a", html: "<b>hi</b>" }]);
    });

    expect(result.current.selectedBlocksHtml).toEqual([
      { id: "a", html: "<b>hi</b>" },
    ]);
  });

  it("updateSelectedBlocks에 updater 함수를 넘기면 이전 상태 기준으로 업데이트된다", () => {
    const { result } = renderHook(() => useSnapshotData(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateSelectedBlocks(() => [
        { id: "x", html: "<i>x</i>" },
      ]);
    });

    expect(result.current.selectedBlocksHtml).toEqual([
      { id: "x", html: "<i>x</i>" },
    ]);
  });

  it("isSnapshotFetching이 fetch 중일 때 true이다", async () => {
    let resolvePromise: (value: string) => void = () => {};
    const fetchPromise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });
    (fetchPage as jest.Mock).mockReturnValue(fetchPromise);

    const { result } = renderHook(() => useSnapshotData(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.fetchSnapshot("https://example.com");
    });

    await waitFor(() => {
      expect(result.current.isSnapshotFetching).toBe(true);
    });

    await act(async () => {
      resolvePromise("<html>done</html>");
    });

    await waitFor(() => {
      expect(result.current.isSnapshotFetching).toBe(false);
    });
  });
});
