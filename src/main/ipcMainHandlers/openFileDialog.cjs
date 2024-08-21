const { ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

const openFileDialog = () => {
  ipcMain.handle("open-file-dialog", async () => {
    try {
      const mime = (await import("mime")).default;
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
      });
      const selectedFilePath = result.filePaths[0];
      const { base: attachmentName, ext: extension } =
        path.parse(selectedFilePath);
      const selectFileStat = fs.statSync(selectedFilePath);

      if (selectFileStat.isDirectory()) {
        return { attachmentName, canceled: result.canceled };
      }

      const fileBuffer = fs.readFileSync(selectedFilePath);
      const baseName = path.basename(selectedFilePath);
      const fileBase64 = fileBuffer.toString("base64");
      const mimeType = mime.getType(extension);

      return {
        canceled: result.canceled,
        selectedFilePath,
        attachmentName,
        fileBase64,
        baseName,
        mimeType,
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

openFileDialog();
