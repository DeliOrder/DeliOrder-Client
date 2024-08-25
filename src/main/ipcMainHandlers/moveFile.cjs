const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const moveFile = () => {
  ipcMain.handle("move-file", async (event, order) => {
    try {
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
    } catch (error) {
      console.error("moving-file main handler 에러:", error);
    }
  });
};

moveFile();
