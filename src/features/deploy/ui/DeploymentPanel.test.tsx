import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeploymentPanel from "@/features/deploy/ui/DeploymentPanel";
import * as deployStore from "@/features/deploy/model/useDeployStore";
import * as snapshotStore from "@/features/snapshot/model/useSnapshotStore";
import * as useDeployHook from "@/features/deploy/model/useDeploy";

jest.mock("@/features/deploy/model/useDeploy");
jest.mock("@/features/deploy/model/useDeployStore");
jest.mock("@/features/snapshot/model/useSnapshotStore");

describe("DeploymentPanel", () => {
  beforeEach(() => {
    (deployStore.useDeployStore as unknown as jest.Mock).mockReturnValue({
      isRendered: true,
      subdomain: "testsub",
      deployMode: "partial",
      updateSubdomain: jest.fn(),
    });

    (snapshotStore.useSnapshotStore as unknown as jest.Mock).mockReturnValue({
      selectedBlocksHtml: [{ id: "1", html: "<p>test</p>" }],
    });

    (useDeployHook.useDeploy as jest.Mock).mockReturnValue({
      deploy: jest.fn(),
      isDeploying: false,
      modal: {
        isOpen: true,
        message: "https://test.scrabbit.site",
        statusCode: 200,
        close: jest.fn(),
      },
    });
  });

  it("입력값 변경 시 updateSubdomain이 호출된다", () => {
    const updateMock = jest.fn();
    (deployStore.useDeployStore as unknown as jest.Mock).mockReturnValueOnce({
      isRendered: true,
      subdomain: "",
      deployMode: "partial",
      updateSubdomain: updateMock,
    });

    render(<DeploymentPanel snapshotHtml="<p>preview</p>" />);
    const input = screen.getByPlaceholderText("생성할 서브 주소 입력");
    fireEvent.change(input, { target: { value: "new-sub" } });

    expect(updateMock).toHaveBeenCalledWith("new-sub");
  });

  it("모달이 열려 있을 때 주소 복사 버튼 클릭 시 복사를 시도한다", async () => {
    const writeTextMock = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<DeploymentPanel snapshotHtml="<p>preview</p>" />);
    const copyButton = screen.getByRole("button", { name: /copy icon/i });

    fireEvent.click(copyButton);
    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith("https://test.scrabbit.site");
    });
  });

  it("확인 버튼 클릭 시 modal.close를 호출한다", () => {
    const closeMock = jest.fn();
    (useDeployHook.useDeploy as jest.Mock).mockReturnValueOnce({
      deploy: jest.fn(),
      isDeploying: false,
      modal: {
        isOpen: true,
        message: "https://test.scrabbit.site",
        statusCode: 200,
        close: closeMock,
      },
    });

    render(<DeploymentPanel snapshotHtml="<p>preview</p>" />);
    const confirmButton = screen.getByRole("button", { name: "확인" });

    fireEvent.click(confirmButton);
    expect(closeMock).toHaveBeenCalled();
  });
});
