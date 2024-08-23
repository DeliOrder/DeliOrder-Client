const { ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { execSync } = require("child_process");

const { convertPath } = require("../utils/convertPath.cjs");

const executeFile = () => {
  ipcMain.handle("execute-file", async (event, order) => {
    if (order.action !== "실행하기") {
      return "수신받은 행동이 '실행하기'가 아닙니다.";
    }

    const platform = os.platform();
    const fullPath =
      order.attachmentType === "folder"
        ? path.join(order.executionPath)
        : path.join(order.executionPath, order.attachmentName);
    const convertedFullPath = convertPath(fullPath);

    if (!fs.existsSync(convertedFullPath)) {
<<<<<<< HEAD
      throw new Error("해당 위치에 요청한 파일 또는 폴더가 없습니다.");
=======
      return "실행 실패: 해당 위치에 요청한 파일이 없습니다.";
>>>>>>> 42310f0 (Feat: 각 오더의 결과값을 받아올 수 있도록 로직 구현)
    }

    try {
      execSync(
        `${platform === "win32" ? "explorer" : "open"} "${convertedFullPath}"`,
      );

      return "실행 성공";
    } catch (error) {
      console.error("execute-file main handler 에러:", error);
      return "실행 실패";
    }
  });
};

executeFile();
