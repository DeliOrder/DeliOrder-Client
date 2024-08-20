const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs").promises;
const { convertPath } = require("../utils/convertPath.cjs");

const moveFile = async () => {
  ipcMain.handle(
    "move-file",
    async (event, sourcePath, executionPath, orderFileName) => {
      const oldFullPath = path.join(sourcePath, orderFileName);
      const newFullPath = path.join(executionPath, orderFileName);
      const newFileDirectory = convertPath(executionPath);
      const convertedOldFullPath = convertPath(oldFullPath);
      const convertedNewFullPath = convertPath(newFullPath);

      try {
        await fs.mkdir(newFileDirectory, { recursive: true });
        await fs.copyFile(convertedOldFullPath, convertedNewFullPath);
        await fs.unlink(convertedOldFullPath);
      } catch (error) {
        console.error("Error moving file:", error);
      }
    },
  );
};

module.exports = { moveFile };
