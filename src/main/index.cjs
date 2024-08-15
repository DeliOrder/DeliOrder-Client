require("dotenv").config();

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const BASE_URL = process.env.VITE_BASE_URL;
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadURL(BASE_URL);
};

app.whenReady().then(() => {
  createWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("open-file-dialog", async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    console.log("main filePaths", result);
    return result;
  } catch (error) {
    console.error("open-file-dialog handler:", error);
    return { canceled: true, filePaths: [] };
  }
});
