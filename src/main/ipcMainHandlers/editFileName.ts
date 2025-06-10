import { ipcMain } from "electron";
import path from "path";
import fs from "fs/promises";
import { convertPath } from "../utils/convertPath";

interface Order {
  action: string;
  executionPath: string;
  attachmentType: "file" | "folder";
  attachmentName: string;
  editingName: string;
}

const editFileName = (): void => {
  ipcMain.handle("edit-file-name", async (_event, order: Order) => {
    try {
      if (order.action !== "수정하기") {
        return "수신받은 행동이 '수정하기'가 아닙니다.";
      }

      const folderPath = path.dirname(order.executionPath);
      const oldFullPath =
        order.attachmentType === "folder"
          ? path.join(folderPath, order.attachmentName)
          : path.join(order.executionPath, order.attachmentName);

      const newFullPath =
        order.attachmentType === "folder"
          ? path.join(folderPath, order.editingName)
          : path.join(order.executionPath, order.editingName);

      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      try {
        await fs.access(convertedOldFullPath);
      } catch {
        return "파일명 수정 실패: 해당 위치에 요청한 파일이 없습니다.";
      }

      await fs.rename(convertedOldFullPath, convertedNewFullPath);
      return "수정 성공";
    } catch (error) {
      console.error("edit-file-name main handler 에러:", error);
      return "파일명 수정 실패";
    }
  });
};

export default editFileName;
