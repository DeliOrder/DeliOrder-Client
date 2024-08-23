const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { convertPath } = require("../utils/convertPath.cjs");

const moveFile = () => {
  ipcMain.handle("move-file", async (event, order) => {
    try {
<<<<<<< HEAD
      const oldFullPath =
        order.attachmentType === "folder"
          ? path.join(order.sourcePath)
          : path.join(order.sourcePath, order.attachmentName);
=======
      if (order.action !== "이동하기") {
        return "수신받은 행동이 '이동하기'가 아닙니다.";
      }

      const oldFullPath = path.join(order.sourcePath, order.attachmentName);
>>>>>>> 42310f0 (Feat: 각 오더의 결과값을 받아올 수 있도록 로직 구현)
      const newFullPath = path.join(order.executionPath, order.attachmentName);

      const convertedFolderPath = convertPath(order.executionPath);
      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      if (!fs.existsSync(convertedFolderPath)) {
        fs.mkdirSync(convertedFolderPath, { recursive: true });
      }

<<<<<<< HEAD
      fs.renameSync(convertedOldFullPath, convertedNewFullPath);
=======
      fs.rename(convertedOldFullPath, convertedNewFullPath, (error) => {
        if (error) {
          console.error("파일 이동 중 오류 발생:", error);
          return;
        }
        console.log(`파일이 ${convertedNewFullPath}로 이동하였습니다.`);
        return "이동 성공";
      });
>>>>>>> 42310f0 (Feat: 각 오더의 결과값을 받아올 수 있도록 로직 구현)
    } catch (error) {
      console.error("moving-file main handler 에러:", error);
      return "이동 실패";
    }
  });
};

moveFile();
