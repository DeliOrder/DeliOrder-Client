const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const moveFile = () => {
  ipcMain.handle("move-file", async (event, order) => {
    try {
      const oldFullPath = path.join(order.sourcePath, order.attachmentName);
      const newFullPath = path.join(order.executionPath, order.attachmentName);

      const convertedFolderPath = convertPath(order.executionPath);
      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      if (!fs.existsSync(convertedFolderPath)) {
        // TODO: 해당 폴더가 없는 경우 수신자에게 처리 선택 보여주는 화면 추가 제시 필요
        fs.mkdirSync(convertedFolderPath, { recursive: true });
      }

      fs.rename(convertedOldFullPath, convertedNewFullPath, (error) => {
        if (error) {
          console.error("파일 이동 중 오류 발생:", error);
          return;
        }
        console.log(`파일이 ${convertedNewFullPath}로 이동하였습니다.`);
      });
    } catch (error) {
      console.error("moving-file main handler 에러:", error);
    }
  });
};

moveFile();
