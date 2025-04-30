import { fetchPage } from "@/features/snapshot/api/fetchPage";

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe("fetchPage", () => {
  it("정상 응답 시 snapshotHtml을 반환한다", async () => {
    const html = "<html>snapshot</html>";
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ snapshotHtml: html }),
    });

    const result = await fetchPage("https://example.com");
    expect(result).toBe(html);
  });

  it("snapshotHtml이 null이면 null을 반환한다", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ snapshotHtml: null }),
    });

    const result = await fetchPage("https://example.com");
    expect(result).toBeNull();
  });

  it("에러 응답에 message가 있으면 해당 메시지를 throw한다", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "잘못된 요청" }),
    });

    await expect(fetchPage("https://example.com")).rejects.toThrow(
      "잘못된 요청",
    );
  });

  it("에러 응답에 message가 없으면 기본 메시지를 throw한다", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    await expect(fetchPage("https://example.com")).rejects.toThrow(
      "페이지를 가져오는 데 실패했습니다.",
    );
  });
});
