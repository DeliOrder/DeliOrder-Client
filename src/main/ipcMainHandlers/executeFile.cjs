const { ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { exec } = require("child_process");

const { convertPath } = require("../utils/convertPath.cjs");

const executeFile = () => {
  ipcMain.handle("execute-file", async (event, order) => {
    if (order.action !== "실행하기") {
      console.error(`수신받은 행동이 "실행하기"가 아닙니다.`);
      return;
    }

    const platform = os.platform();
    const folderPath = convertPath(order.executionPath);
    const filePath = path.join(folderPath, order.attachmentName);

    if (!fs.existsSync(filePath)) {
      throw new Error("해당 위치에 요청한 파일이 없습니다.");
    }

    exec(
      `${platform === "win32" ? "start" : "open"} "${filePath}"`,
      (error) => {
        if (error) {
          console.error("파일 실행하는 중 에러가 발생했습니다.");
        }
      },
    );
  });
};

executeFile();
