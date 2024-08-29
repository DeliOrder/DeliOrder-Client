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
      if (order.action !== "삭제하기") {
        return "수신받은 행동이 '삭제하기'가 아닙니다.";
      }

      const fullPath =
        order.attachmentType === "folder"
          ? path.join(order.executionPath)
          : path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);

      if (
        MAC_CRITICAL_PATHS.includes(convertedFullPath) ||
        WINDOWS_CRITICAL_PATHS.includes(convertedFullPath)
      ) {
        return "해당 폴더는 삭제할 수 없습니다.";
      }

      if (!fs.existsSync(convertedFullPath)) {
        return "해당 위치에 요청한 파일 또는 폴더가 없습니다.";
      }

      const trash = (await import("trash")).default;
      await trash(convertedFullPath);

      return "삭제 성공";
    } catch (error) {
      console.error("delete-file main handler 에러:", error);

      return "삭제 실패";
    }
  });
};
