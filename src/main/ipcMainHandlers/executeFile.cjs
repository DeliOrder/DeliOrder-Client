const { ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { execSync } = require("child_process");

const { convertPath } = require("../utils/convertPath.cjs");

const executeFile = () => {
  ipcMain.handle("execute-file", async (event, order) => {
    if (order.action !== "실행하기") {
      console.error(`수신받은 행동이 "실행하기"가 아닙니다.`);
      return;
    }

    const platform = os.platform();
    const fullPath = path.join(order.executionPath, order.attachmentName);
    const convertedFullPath = convertPath(fullPath);

    if (!fs.existsSync(convertedFullPath)) {
      throw new Error("해당 위치에 요청한 파일이 없습니다.");
    }
    try {
      execSync(
        `${platform === "win32" ? "start" : "open"} "${convertedFullPath}"`,
      );
    } catch (error) {
      console.error("execute-file main handler 에러:", error);
    }
  });
};

executeFile();
