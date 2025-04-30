import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPage } from "@/features/snapshot/api/fetchPage";
import { useSnapshotStore } from "@/features/snapshot/model/useSnapshotStore";

export function useSnapshotData() {
  const queryClient = useQueryClient();
  const { selectedBlocksHtml, setSelectedBlocksHtml } = useSnapshotStore();

  const mutation = useMutation({
    mutationFn: fetchPage,
    onSuccess: (snapshotHtml) => {
      queryClient.setQueryData(["snapshotHtml"], snapshotHtml);
    },
  });

  const updateSelectedBlocks = (
    updater:
      | { id: string; html: string }[]
      | ((
          prev: { id: string; html: string }[],
        ) => { id: string; html: string }[]),
  ) => {
    setSelectedBlocksHtml(updater);
  };

  const getSnapshotHtml = (): string | null => {
    return queryClient.getQueryData(["snapshotHtml"]) ?? null;
  };

  const startSnapshotFetch = (sourceUrl: string) => {
    mutation.mutate(sourceUrl);
  };

  const isSnapshotFetching = mutation.isPending;

  return {
    snapshotHtml: getSnapshotHtml(),
    fetchSnapshot: startSnapshotFetch,
    isSnapshotFetching,
    selectedBlocksHtml,
    updateSelectedBlocks,
  };
}
