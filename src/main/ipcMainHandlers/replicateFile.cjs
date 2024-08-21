const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const { getCopyFileName } = require("../utils/getCopyFileName.cjs");
const { convertPath } = require("../utils/convertPath.cjs");

const replicateFile = () => {
  ipcMain.handle("replicate-file", async (event, order) => {
    if (order.action !== "복제하기") {
      console.error(`수신받은 행동이 "복제하기"가 아닙니다.`);
      return;
    }

    const folderPath = convertPath(order.executionPath);
    const filePath = path.join(folderPath, order.attachmentName);
    const baseName = path.basename(order.attachmentName);

    if (!fs.existsSync(filePath)) {
      throw new Error("해당 위치에 요청한 파일이 없습니다.");
    }

    let copyFileName = getCopyFileName(baseName);
    let copyFilePath = path.join(folderPath, copyFileName);

    while (fs.existsSync(copyFilePath)) {
      copyFileName = getCopyFileName(copyFileName);
      copyFilePath = path.join(folderPath, copyFileName);
    }

    fs.copyFile(filePath, copyFilePath, (error) => {
      if (error) {
        console.log("파일 복사 중 오류가 발생하였습니다.", error);
      } else {
        console.log("파일이 성공적으로 복사되었습니다.");
      }
    });
  });
};

replicateFile();
