const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const {
  MAC_CRITICAL_PATHS,
  WINDOWS_CRITICAL_PATHS,
} = require("../constants/criticalPaths.cjs");
const { convertPath } = require("../utils/convertPath.cjs");

const deleteFile = () => {
  ipcMain.handle("delete-file", async (event, order) => {
    try {
      const fullPath =
        order.attachmentType === "folder"
          ? path.join(order.executionPath)
          : path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);

      if (
        MAC_CRITICAL_PATHS.includes(convertedFullPath) ||
        WINDOWS_CRITICAL_PATHS.includes(convertedFullPath)
      ) {
        throw new Error("해당 폴더는 삭제할 수 없습니다.");
      }

      if (!fs.existsSync(convertedFullPath)) {
        throw new Error("해당 위치에 요청한 파일 또는 폴더가 없습니다.");
      }

      const trash = (await import("trash")).default;
      await trash(convertedFullPath);
    } catch (error) {
      console.error("delete-file main handler 에러:", error);
    }
  });
};

deleteFile();
