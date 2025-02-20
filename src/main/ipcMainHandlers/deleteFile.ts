import { ipcMain } from "electron";
import path from "path";
import fs from "fs/promises";
import { constants } from "fs";
import {
  MAC_CRITICAL_PATHS,
  WINDOWS_CRITICAL_PATHS,
} from "../constants/criticalPaths";
import { convertPath } from "../utils/convertPath";

interface Order {
  action: string;
  attachmentType?: string;
  executionPath: string;
  attachmentName?: string;
}

const deleteFile = (): void => {
  ipcMain.handle("delete-file", async (_event, order: Order) => {
    try {
      if (order.action !== "삭제하기") {
        return "수신받은 행동이 '삭제하기'가 아닙니다.";
      }

      const fullPath =
        order.attachmentType === "folder"
          ? path.join(order.executionPath)
          : path.join(order.executionPath, order.attachmentName || "");

      const convertedFullPath = convertPath(fullPath);

      if (
        MAC_CRITICAL_PATHS.includes(convertedFullPath) ||
        WINDOWS_CRITICAL_PATHS.includes(convertedFullPath)
      ) {
        return "해당 폴더는 삭제할 수 없습니다.";
      }

      try {
        await fs.access(convertedFullPath, constants.F_OK);
      } catch {
        return "해당 위치에 요청한 파일 또는 폴더가 없습니다.";
      }

      const { default: trash } = await import("trash");
      await trash(convertedFullPath);

      return "삭제 성공";
    } catch (error) {
      console.error("delete-file main handler 에러:", error);
      return "삭제 실패";
    }
  });
};

export default deleteFile;
