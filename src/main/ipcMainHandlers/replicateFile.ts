import { ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import fs from "fs/promises";
import { convertPath } from "../utils/convertPath";

interface Order {
  action: string;
  executionPath: string;
  attachmentType: "file" | "folder";
  attachmentName: string;
}

const replicateFile = (): void => {
  ipcMain.handle(
    "replicate-file",
    async (_event: IpcMainInvokeEvent, order: Order): Promise<string> => {
      try {
        if (order.action !== "복제하기") {
          return "수신받은 행동이 '복제하기'가 아닙니다.";
        }

        const fullPath =
          order.attachmentType === "folder"
            ? path.join(order.executionPath)
            : path.join(order.executionPath, order.attachmentName);
        const convertedFullPath = convertPath(fullPath);

        try {
          await fs.access(convertedFullPath);
        } catch {
          return "복제 실패: 해당 위치에 요청한 파일이 없습니다.";
        }

        const baseName = path.basename(order.attachmentName);
        const folderPath = convertPath(order.executionPath);
        let copyFileName = getCopyFileName(baseName);
        let copyFilePath =
          order.attachmentType === "folder"
            ? path.join(path.dirname(folderPath), copyFileName)
            : path.join(folderPath, copyFileName);

        while (await fileExists(copyFilePath)) {
          copyFileName = getCopyFileName(copyFileName);
          copyFilePath =
            order.attachmentType === "folder"
              ? path.join(path.dirname(folderPath), copyFileName)
              : path.join(folderPath, copyFileName);
        }

        await fs.cp(convertedFullPath, copyFilePath, { recursive: true });

        return "복제 성공";
      } catch (error) {
        console.error("replicate-file main handler 에러:", error);
        return "복제 실패";
      }
    },
  );
};

// 비동기 파일 존재 여부 확인 함수 추가
const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export default replicateFile;
