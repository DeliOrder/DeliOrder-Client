const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const editFileName = () => {
  ipcMain.handle("edit-file-name", async (event, order) => {
    try {
      const fullOldPath = path.join(order.executionPath, order.attachmentName);
      const oldFilePath = convertPath(fullOldPath);

      const fullNewPath = path.join(order.executionPath, order.editingName);
      const newFilePath = convertPath(fullNewPath);

      if (!fs.existsSync(oldFilePath)) {
        throw new Error("해당 위치에 요청한 파일이 없습니다.");
      }

      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          console.error("파일명 변경 중 오류 발생:", err);
          return;
        }
        console.log(`파일명이 ${order.editingName}로 변경되었습니다.`);
      });

      return;
    } catch (error) {
      console.error("edit-file-Name main handler error:", error);
    }
  });
};
module.exports = { editFileName };
