import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPage } from "@/features/snapshot/api/fetchPage";

export function useSnapshotData() {
  const queryClient = useQueryClient();
  const [selectedBlocksHtml, setSelectedBlocksHtml] = useState<
    { id: string; html: string }[]
  >([]);

  const mutation = useMutation({
    mutationFn: fetchPage,
    onSuccess: (snapshotHtml) => {
      queryClient.setQueryData(["snapshotHtml"], snapshotHtml);
    },
  });

  return {
    snapshotHtml: mutation.data ?? null,
    selectedBlocksHtml,
    setSelectedBlocksHtml,
    fetchSnapshot: mutation.mutate,
    isFetching: mutation.isPending,
  };
}
