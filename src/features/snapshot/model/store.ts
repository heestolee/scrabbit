import { create } from "zustand";

interface Block {
  id: string;
  html: string;
}

interface SnapshotState {
  selectedBlocksHtml: Block[];
  setSelectedBlocksHtml: (
    updater: Block[] | ((prev: Block[]) => Block[]),
  ) => void;
  resetSelectedBlocks: () => void;
}

export const useSnapshotStore = create<SnapshotState>((set) => ({
  selectedBlocksHtml: [],
  setSelectedBlocksHtml: (updater) =>
    set((state) => ({
      selectedBlocksHtml:
        typeof updater === "function"
          ? updater(state.selectedBlocksHtml)
          : updater,
    })),
  resetSelectedBlocks: () => set({ selectedBlocksHtml: [] }),
}));
