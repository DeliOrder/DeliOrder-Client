const { ipcMain } = require("electron");
const path = require("path");

const getAttachmentName = () => {
  try {
    ipcMain.handle("get-attachmentName", (event, selectedPath) => {
      return path.basename(selectedPath);
    });
  } catch (error) {
    throw new Error(error);
  }
};

getAttachmentName();
