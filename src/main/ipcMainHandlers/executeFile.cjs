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
      const MAC_COMMAND_NOT_FOUND_STATUS = 127;
      const WINDOWS_COMMAND_NOT_FOUND_STATUS = 1;

      console.error("execute-file main handler 에러:", error);
      if (
        error.status === MAC_COMMAND_NOT_FOUND_STATUS ||
        error.status === WINDOWS_COMMAND_NOT_FOUND_STATUS
      ) {
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
