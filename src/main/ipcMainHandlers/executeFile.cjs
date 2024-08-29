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
      return "실행 실패: 해당 위치에 요청한 파일이 없습니다.";
    }

    try {
      const command = order.useVscode
        ? `code ${convertedFullPath}`
        : `${platform === "win32" ? `start ""` : "open"} "${convertedFullPath}"`;

      execSync(command);

      return "실행 성공";
    } catch (error) {
      const STATUS_UNDEFINED_COMMAND = 127;

      console.error("execute-file main handler 에러:", error);
      if (error.status === STATUS_UNDEFINED_COMMAND) {
        execSync(
          `${platform === "win32" ? `start ""` : "open"} "${convertedFullPath}"`,
        );

        return "해당 명령어가 존재하지 않습니다.";
      }

      return "실행 실패";
    }
  });
};

executeFile();
