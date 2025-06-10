import { ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import fs from "fs/promises";
import { convertPath } from "../utils/convertPath";

interface Order {
  action: string;
  sourcePath: string;
  executionPath: string;
  attachmentType: "file" | "folder";
  attachmentName: string;
}

const moveFile = (): void => {
  ipcMain.handle(
    "move-file",
    async (_event: IpcMainInvokeEvent, order: Order) => {
      try {
        if (order.action !== "이동하기") {
          return "수신받은 행동이 '이동하기'가 아닙니다.";
        }

        const oldFullPath =
          order.attachmentType === "folder"
            ? path.join(order.sourcePath)
            : path.join(order.sourcePath, order.attachmentName);
        const newFullPath = path.join(
          order.executionPath,
          order.attachmentName,
        );

        const convertedFolderPath = convertPath(order.executionPath);
        const convertedOldFullPath = convertPath(oldFullPath);
        const convertedNewFullPath = convertPath(newFullPath);

        try {
          await fs.access(convertedFolderPath);
        } catch {
          await fs.mkdir(convertedFolderPath, { recursive: true });
        }

        await fs.rename(convertedOldFullPath, convertedNewFullPath);

        return "이동 성공";
      } catch (error) {
        console.error("moving-file main handler 에러:", error);
        return "이동 실패";
      }
    },
  );
};

export default moveFile;
