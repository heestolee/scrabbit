import { deployPage } from "@/features/deploy/api/deployPage";
import { DeployPageInput } from "@/features/deploy/api/deployPage";

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe("deployPage", () => {
  const baseInput: DeployPageInput = {
    subdomain: "test-subdomain",
    deployMode: "partial",
    selectedBlocksHtml: [{ id: "1", html: "<p>block</p>" }],
    snapshotHtml: "<html>snapshot</html>",
  };

  it("partial 모드: selectedBlocksHtml을 전송하고 url을 반환한다", async () => {
    const mockUrl = "https://example.com/page";

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ url: mockUrl }),
    });

    const result = await deployPage(baseInput);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/deployments/partial"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          subdomain: baseInput.subdomain,
          deployMode: baseInput.deployMode,
          deployContent: baseInput.selectedBlocksHtml,
        }),
      }),
    );

    expect(result).toEqual({ url: mockUrl, status: 200 });
  });

  it("full 모드: snapshotHtml을 전송하고 url을 반환한다", async () => {
    const input: DeployPageInput = {
      ...baseInput,
      deployMode: "full",
    };
    const mockUrl = "https://example.com/full";

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ url: mockUrl }),
    });

    const result = await deployPage(input);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/deployments/full"),
      expect.objectContaining({
        body: JSON.stringify({
          subdomain: input.subdomain,
          deployMode: input.deployMode,
          deployContent: input.snapshotHtml,
        }),
      }),
    );

    expect(result).toEqual({ url: mockUrl, status: 200 });
  });

  it("API 응답에 error가 포함되면 해당 메시지를 throw한다", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "배포 실패" }),
    });

    await expect(deployPage(baseInput)).rejects.toThrow("배포 실패");
  });

  it("응답에 error가 없으면 기본 메시지를 throw한다", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    await expect(deployPage(baseInput)).rejects.toThrow("페이지 생성 실패");
  });
});
