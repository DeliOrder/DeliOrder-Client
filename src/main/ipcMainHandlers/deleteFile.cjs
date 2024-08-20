const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const deleteFile = () => {
  ipcMain.handle("delete-file", async (event, order) => {
    try {
      const fullPath = path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);

      if (!fs.existsSync(convertedFullPath)) {
        throw new Error("해당 위치에 요청한 파일이 없습니다.");
      }

      const trash = (await import("trash")).default;
      await trash(convertedFullPath);

      return;
    } catch (error) {
      console.error("delete-file main handler error:", error);
    }
  });
};

deleteFile();
