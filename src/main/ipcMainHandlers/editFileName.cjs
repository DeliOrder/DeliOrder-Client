const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const editFileName = () => {
  ipcMain.handle("edit-file-name", async (event, order) => {
    try {
      if (order.action !== "수정하기") {
        return "수신받은 행동이 '수정하기'가 아닙니다.";
      }

      const folderPath = path.dirname(order.executionPath);
      const oldFullPath =
        order.attachmentType === "folder"
          ? path.join(folderPath, order.attachmentName)
          : path.join(order.executionPath, order.attachmentName);
      const newFullPath =
        order.attachmentType === "folder"
          ? path.join(folderPath, order.editingName)
          : path.join(order.executionPath, order.editingName);
      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      if (!fs.existsSync(convertedOldFullPath)) {
        return "파일명 수정 실패: 해당 위치에 요청한 파일이 없습니다.";
      }

      fs.renameSync(convertedOldFullPath, convertedNewFullPath);
      return "수정 성공";
    } catch (error) {
      console.error("edit-file-Name main handler 에러:", error);
      return "파일명 수정 실패";
    }
  });
};

editFileName();
