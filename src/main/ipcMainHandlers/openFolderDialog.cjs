const { ipcMain, dialog } = require("electron");
const path = require("path");
const os = require("os");

const homeDir = os.homedir();

const openFolderDialog = () => {
  ipcMain.handle("open-folder-dialog", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      const selectedFolderPath = result.filePaths[0];
      const relativePath = path.relative(homeDir, selectedFolderPath);

      return {
        canceled: result.canceled,
        folderPaths: relativePath,
      };
    } catch (error) {
      console.error("open-folder-dialog handler:", error);
      return {
        canceled: true,
        filePaths: "",
      };
    }
  });
};

openFolderDialog();
