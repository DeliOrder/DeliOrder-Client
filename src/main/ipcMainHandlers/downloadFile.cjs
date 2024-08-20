const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const https = require("https");

const { convertPath } = require("../utils/convertPath.cjs");

const downloadFile = () => {
  ipcMain.handle("download-file", async (event, order) => {
    try {
      const fullPath = path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);
      const convertedFolderPath = convertPath(order.executionPath);
      const file = fs.createWriteStream(convertedFullPath);

      if (!fs.existsSync(convertedFolderPath)) {
        //TODO: 해당 폴더가 없는경우 수신자에게 처리 선택 보여주는 화면 추가 제시 필요
        fs.mkdirSync(convertedFolderPath, { recursive: true });
      }

      https
        .get(order.attachmentUrl, (response) => {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
          });
        })
        .on("error", (error) => {
          fs.unlink(convertedFullPath);
          console.error("파일 다운로드 중 오류 발생", error);
        });
    } catch (error) {
      console.error("download-file main handler 에러:", error);
    }
  });
};

downloadFile();
