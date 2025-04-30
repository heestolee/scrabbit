import { useSnapshotStore } from "@/features/snapshot/model/useSnapshotStore";

describe("useSnapshotStore", () => {
  beforeEach(() => {
    useSnapshotStore.getState().resetSelectedBlocks();
  });

  it("새 배열을 전달하면 상태가 업데이트된다", () => {
    const newBlocks = [{ id: "1", html: "<p>hi</p>" }];
    useSnapshotStore.getState().setSelectedBlocksHtml(newBlocks);
    expect(useSnapshotStore.getState().selectedBlocksHtml).toEqual(newBlocks);
  });

  it("추가 선택 시 업데이트로 기존 블록에 추가할 수 있다", () => {
    const block = { id: "1", html: "<p>hi</p>" };
    useSnapshotStore.getState().setSelectedBlocksHtml([block]);
    useSnapshotStore
      .getState()
      .setSelectedBlocksHtml((prev) => [
        ...prev,
        { id: "2", html: "<p>bye</p>" },
      ]);
    expect(useSnapshotStore.getState().selectedBlocksHtml).toHaveLength(2);
  });

  it("resetSelectedBlocks는 빈 배열로 초기화한다", () => {
    useSnapshotStore
      .getState()
      .setSelectedBlocksHtml([{ id: "x", html: "<p>x</p>" }]);
    useSnapshotStore.getState().resetSelectedBlocks();
    expect(useSnapshotStore.getState().selectedBlocksHtml).toEqual([]);
  });
});
