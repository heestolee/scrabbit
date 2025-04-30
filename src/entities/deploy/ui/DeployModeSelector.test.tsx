import { render, screen, fireEvent } from "@testing-library/react";
import DeployModeSelector from "./DeployModeSelector";
import { useDeployStore } from "@/features/deploy/model/useDeployStore";

jest.mock("@/features/deploy/model/useDeployStore");

const mockDeployStore = useDeployStore as jest.MockedFunction<
  typeof useDeployStore
>;

describe("DeployModeSelector", () => {
  it("현재 모드가 'full'이면 토글 시 'partial' 모드로 전환된다", () => {
    const startPartialDeploy = jest.fn();

    mockDeployStore.mockReturnValue({
      deployMode: "full",
      startPartialDeploy,
      startFullDeploy: jest.fn(),
    } as any);

    render(<DeployModeSelector />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(startPartialDeploy).toHaveBeenCalled();
  });

  it("현재 모드가 'partial'이면 토글 시 'full' 모드로 전환된다", () => {
    const startFullDeploy = jest.fn();

    mockDeployStore.mockReturnValue({
      deployMode: "partial",
      startFullDeploy,
      startPartialDeploy: jest.fn(),
    } as any);

    render(<DeployModeSelector />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(startFullDeploy).toHaveBeenCalled();
  });
});
