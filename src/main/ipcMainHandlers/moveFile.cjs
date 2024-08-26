const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const moveFile = () => {
  ipcMain.handle("move-file", async (event, order) => {
    try {
      if (order.action !== "이동하기") {
        return "수신받은 행동이 '이동하기'가 아닙니다.";
      }

      const oldFullPath =
        order.attachmentType === "folder"
          ? path.join(order.sourcePath)
          : path.join(order.sourcePath, order.attachmentName);
      const newFullPath = path.join(order.executionPath, order.attachmentName);

      const convertedFolderPath = convertPath(order.executionPath);
      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      if (!fs.existsSync(convertedFolderPath)) {
        fs.mkdirSync(convertedFolderPath, { recursive: true });
      }

      fs.renameSync(convertedOldFullPath, convertedNewFullPath);

      return "이동 성공";
    } catch (error) {
      console.error("moving-file main handler 에러:", error);
      return "이동 실패";
    }
  });
};

moveFile();
