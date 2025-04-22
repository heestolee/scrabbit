import { create } from "zustand";

export type Mode = "full" | "partial";

interface DeployState {
  deployMode: Mode;
  isRendered: boolean;
  subdomain: string;

  startFullDeploy: () => void;
  startPartialDeploy: () => void;

  markAsRendered: () => void;
  resetRendered: () => void;

  updateSubdomain: (value: string) => void;
  clearSubdomain: () => void;

  resetDeployState: () => void;
}

export const useDeployStore = create<DeployState>((set) => ({
  deployMode: "full",
  isRendered: false,
  subdomain: "",

  startFullDeploy: () => set({ deployMode: "full" }),
  startPartialDeploy: () => set({ deployMode: "partial" }),

  markAsRendered: () => set({ isRendered: true }),
  resetRendered: () => set({ isRendered: false }),

  updateSubdomain: (value) => set({ subdomain: value }),
  clearSubdomain: () => set({ subdomain: "" }),

  resetDeployState: () =>
    set({ deployMode: "full", isRendered: false, subdomain: "" }),
}));
