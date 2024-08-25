const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const editFileName = () => {
  ipcMain.handle("edit-file-name", async (event, order) => {
    try {
      if (order.attachmentType === "folder") {
        order.executionPath = path.dirname(order.executionPath);
      }

      const oldFullPath = path.join(order.executionPath, order.attachmentName);
      const newFullPath = path.join(order.executionPath, order.editingName);
      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      if (
        !fs.existsSync(convertedOldFullPath) &&
        order.attachmentType !== "folder"
      ) {
        throw new Error("해당 위치에 요청한 파일이 없습니다.");
      }

      fs.rename(convertedOldFullPath, convertedNewFullPath, (error) => {
        if (error) {
          console.error("파일명 변경 중 오류 발생:", error);
          return;
        }
        console.log(`파일명이 ${order.editingName}로 변경되었습니다.`);
      });
    } catch (error) {
      console.error("edit-file-Name main handler 에러:", error);
    }
  });
};

editFileName();
