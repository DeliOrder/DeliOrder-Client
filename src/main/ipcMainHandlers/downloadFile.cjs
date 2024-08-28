const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const https = require("https");

const { convertPath } = require("../utils/convertPath.cjs");

const downloadFile = () => {
  ipcMain.handle("download-file", async (event, order) => {
    try {
      if (order.action !== "생성하기") {
        return "수신받은 행동이 '생성하기'가 아닙니다.";
      }

      const fullPath = path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);
      const convertedFolderPath = convertPath(order.executionPath);
      const file = fs.createWriteStream(convertedFullPath);

      if (!fs.existsSync(convertedFolderPath)) {
        fs.mkdirSync(convertedFolderPath, { recursive: true });
      }

      const result = await new Promise((resolve, reject) => {
        https
          .get(order.attachmentUrl, (response) => {
            response.pipe(file);

            file.on("finish", () => {
              file.close(resolve("생성 완료"));
            });
          })
          .on("error", (error) => {
            fs.unlink(convertedFullPath);
            console.error("파일 다운로드 중 오류 발생", error);
            reject("생성 실패");
            return;
          });
      });

      return result;
    } catch (error) {
      console.error("download-file main handler 에러:", error);

      return "생성 실패";
    }
  });
};

downloadFile();
