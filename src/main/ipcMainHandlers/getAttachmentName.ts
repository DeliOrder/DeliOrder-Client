import { ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";

const getAttachmentName = (): void => {
  try {
    ipcMain.handle(
      "get-attachmentName",
      (_event: IpcMainInvokeEvent, selectedPath: string) => {
        return path.basename(selectedPath);
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("getAttachmentName 에러 발생");
  }
};

export default getAttachmentName;
