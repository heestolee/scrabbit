import { useDeployStore } from "@/features/deploy/model/useDeployStore";

describe("useDeployStore", () => {
  beforeEach(() => {
    useDeployStore.getState().resetDeployState();
  });

  it("startFullDeploy()는 deployMode를 'full'로 설정한다", () => {
    useDeployStore.getState().startFullDeploy();
    expect(useDeployStore.getState().deployMode).toBe("full");
  });

  it("startPartialDeploy()는 deployMode를 'partial'로 설정한다", () => {
    useDeployStore.getState().startPartialDeploy();
    expect(useDeployStore.getState().deployMode).toBe("partial");
  });

  it("markAsRendered()는 isRendered를 true로 설정한다", () => {
    useDeployStore.getState().markAsRendered();
    expect(useDeployStore.getState().isRendered).toBe(true);
  });

  it("updateSubdomain()은 subdomain을 설정한다", () => {
    useDeployStore.getState().updateSubdomain("scrabbit");
    expect(useDeployStore.getState().subdomain).toBe("scrabbit");
  });

  it("resetDeployState()는 초기 상태로 리셋한다", () => {
    const store = useDeployStore.getState();
    store.startPartialDeploy();
    store.markAsRendered();
    store.updateSubdomain("changed");

    store.resetDeployState();

    expect(store.deployMode).toBe("full");
    expect(store.isRendered).toBe(false);
    expect(store.subdomain).toBe("");
  });

  it("setState로 deployMode를 직접 설정할 수 있다", () => {
    useDeployStore.setState({ deployMode: "partial" });
    expect(useDeployStore.getState().deployMode).toBe("partial");
  });

  it("store의 모든 메서드가 직접 호출 가능하다", () => {
    const store = useDeployStore.getState();
    store.startFullDeploy();
    store.startPartialDeploy();
    store.markAsRendered();
    store.resetRendered();
    store.updateSubdomain("test-domain");
    store.clearSubdomain();
    store.resetDeployState();
  });
});
