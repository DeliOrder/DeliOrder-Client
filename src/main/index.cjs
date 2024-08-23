require("dotenv").config();

const { app, BrowserWindow } = require("electron");
const path = require("path");

require("./ipcMainHandlers/openFolderDialog.cjs");
require("./ipcMainHandlers/openFileDialog.cjs");
require("./ipcMainHandlers/replicateFile.cjs");
require("./ipcMainHandlers/executeFile.cjs");
require("./ipcMainHandlers/downloadFile.cjs");
require("./ipcMainHandlers/moveFile.cjs");
require("./ipcMainHandlers/deleteFile.cjs");
require("./ipcMainHandlers/editFileName.cjs");

const createWindow = () => {
  const BASE_URL = process.env.VITE_BASE_URL;
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    resizable: false,
    backgroundColor: "#DBEAFE",
    icon: path.join(__dirname, "../renderer/assets/images/logo.png"),
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadURL(BASE_URL);
};

async function createAppWindow() {
  await app.whenReady();
  createWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

createAppWindow();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
