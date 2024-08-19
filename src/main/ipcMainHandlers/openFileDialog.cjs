const { ipcMain, dialog } = require("electron");
const path = require("path");
const os = require("os");

const { convertPath } = require("../utils/convertPath.cjs");

const homeDir = os.homedir();

const openFileDialog = () => {
  ipcMain.handle("open-file-dialog", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      const selectedFilePath = result.filePaths[0];
      const relativePath = path.relative(homeDir, selectedFilePath);

      const testPath = convertPath(relativePath);
      console.log("relativePath", relativePath);
      console.log("test", testPath);

      return {
        canceled: result.canceled,
        filePaths: relativePath,
      };
    } catch (error) {
      console.error("open-file-dialog handler:", error);
      return {
        canceled: true,
        filePaths: "",
      };
    }
  });
};

module.exports = { openFileDialog };
