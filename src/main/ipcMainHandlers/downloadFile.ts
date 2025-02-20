import { ipcMain } from "electron";
import path from "path";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import https from "https";
import { convertPath } from "../utils/convertPath";

interface Order {
  action: string;
  executionPath: string;
  attachmentName: string;
  attachmentUrl: string;
}

const downloadFile = (): void => {
  ipcMain.handle("download-file", async (_event, order: Order) => {
    try {
      if (order.action !== "생성하기") {
        return "수신받은 행동이 '생성하기'가 아닙니다.";
      }

      const fullPath = path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);
      const convertedFolderPath = convertPath(order.executionPath);

      try {
        await fs.access(convertedFolderPath);
      } catch {
        await fs.mkdir(convertedFolderPath, { recursive: true });
      }

      const file = createWriteStream(convertedFullPath);

      const result: string = await new Promise((resolve, reject) => {
        https
          .get(order.attachmentUrl, (response) => {
            response.pipe(file);

            file.on("finish", () => {
              file.close();
              resolve("생성 완료");
            });
          })
          .on("error", async (error) => {
            await fs.unlink(convertedFullPath).catch(() => {});
            console.error("파일 다운로드 중 오류 발생", error);
            reject("생성 실패");
          });
      });

      return result;
    } catch (error) {
      console.error("download-file main handler 에러:", error);
      return "생성 실패";
    }
  });
};

export default downloadFile;
