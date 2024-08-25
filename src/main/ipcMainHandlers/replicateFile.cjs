const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

const { getCopyFileName } = require("../utils/getCopyFileName.cjs");
const { convertPath } = require("../utils/convertPath.cjs");

const replicateFile = () => {
  ipcMain.handle("replicate-file", async (event, order) => {
    try {
      if (order.action !== "복제하기") {
        console.error(`수신받은 행동이 "복제하기"가 아닙니다.`);
        return;
      }

      const fullPath =
        order.attachmentType === "folder"
          ? path.join(order.executionPath)
          : path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);

      if (
        !fs.existsSync(convertedFullPath) &&
        order.attachmentType !== "folder"
      ) {
        throw new Error("해당 위치에 요청한 파일이 없습니다.");
      }

      const baseName = path.basename(order.attachmentName);
      const folderPath = convertPath(order.executionPath);
      let copyFileName = getCopyFileName(baseName);
      let copyFilePath =
        order.attachmentType === "folder"
          ? path.join(path.dirname(folderPath), copyFileName)
          : path.join(folderPath, copyFileName);

      while (fs.existsSync(copyFilePath)) {
        copyFileName = getCopyFileName(copyFileName);
        copyFilePath =
          order.attachmentType === "folder"
            ? path.join(path.dirname(folderPath), copyFileName)
            : path.join(folderPath, copyFileName);
      }

      if (order.attachmentType === "folder") {
        return await fsPromises.cp(convertedFullPath, copyFilePath, {
          recursive: true,
        });
      }

      fs.copyFile(convertedFullPath, copyFilePath, (error) => {
        if (error) {
          console.log("replicate-file main handler 에러:", error);
        } else {
          console.log("파일이 성공적으로 복사되었습니다.");
        }
      });
    } catch (error) {
      console.error("replicate-file main handler 에러:", error);
    }
  });
};

replicateFile();
