import { renderHook, act } from "@testing-library/react";
import { useDeploy } from "@/features/deploy/model/useDeploy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeployPageInput } from "@/features/deploy/api/deployPage";

jest.mock("@/features/deploy/api/deployPage", () => ({
  deployPage: jest.fn(),
}));

import { deployPage } from "@/features/deploy/api/deployPage";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useDeploy", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const input: DeployPageInput = {
    subdomain: "test",
    deployMode: "partial",
    selectedBlocksHtml: [{ id: "1", html: "<div>block</div>" }],
    snapshotHtml: "<html>snapshot</html>",
  };

  it("배포 성공 시 모달 상태와 메시지가 설정된다", async () => {
    (deployPage as jest.Mock).mockResolvedValue({
      url: "/result",
      status: 200,
    });

    const { result } = renderHook(() => useDeploy(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.deploy(input);
    });

    expect(result.current.modal.isOpen).toBe(true);
    expect(result.current.modal.message).toBe("/result");
    expect(result.current.modal.statusCode).toBe(200);
  });

  it("배포 실패 시 모달에 에러 메시지와 상태 코드가 설정된다", async () => {
    (deployPage as jest.Mock).mockRejectedValue(new Error("배포 실패"));

    const { result } = renderHook(() => useDeploy(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.deploy(input);
    });

    expect(result.current.modal.isOpen).toBe(true);
    expect(result.current.modal.message).toBe("배포 실패");
    expect(result.current.modal.statusCode).toBe(500);
  });

  it("배포 실패 시 에러가 Error 객체가 아니면 기본 메시지를 사용한다", async () => {
    (deployPage as jest.Mock).mockRejectedValue("string-error");

    const { result } = renderHook(() => useDeploy(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.deploy(input);
    });

    expect(result.current.modal.message).toBe("페이지 생성 중 오류 발생");
    expect(result.current.modal.statusCode).toBe(500);
  });

  it("배포 실패 시 Error 객체이지만 message가 없으면 기본 메시지를 사용한다", async () => {
    const fakeError = { name: "Error", message: undefined };
    (deployPage as jest.Mock).mockRejectedValue(fakeError);

    const { result } = renderHook(() => useDeploy(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.deploy(input);
    });

    expect(result.current.modal.message).toBe("페이지 생성 중 오류 발생");
    expect(result.current.modal.statusCode).toBe(500);
  });

  it("closeModal 호출 시 모달이 닫힌다", () => {
    const { result } = renderHook(() => useDeploy(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.modal.close();
    });

    expect(result.current.modal.isOpen).toBe(false);
  });
});
