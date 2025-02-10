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
require("./ipcMainHandlers/unzipFile.cjs");
require("./ipcMainHandlers/getAttachmentName.cjs");

let mainWindow;

const BASE_URL = process.env.VITE_BASE_URL || "http://localhost:5173";

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1440,
    minHeight: 1024,
    autoHideMenuBar: true,
    resizable: true,
    backgroundColor: "#F2F2F2",
    icon: path.join(__dirname, "../renderer/assets/icons/icon.ico"),
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(BASE_URL);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
}

function handleDeepLink(url) {
  try {
    const urlObj = new URL(url);
    const packageId = urlObj.searchParams.get("packageId");
    if (packageId) {
      const targetUrl = `${BASE_URL}/package/receiving?packageId=${packageId}`;
      mainWindow.loadURL(targetUrl);
    } else {
      mainWindow.loadURL(`${BASE_URL}/package/receiving`);
    }
  } catch (error) {
    console.error("딥링크 처리 실패:", error);
  }
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("electron-deliorder", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("electron-deliorder");
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (_, commandLine) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();

      const deepLink = commandLine.find((cmd) =>
        cmd.startsWith("electron-deliorder://"),
      );

      if (deepLink) {
        handleDeepLink(deepLink);
      }
    } else {
      createWindow();
    }
  });

  app.whenReady().then(() => {
    createWindow();

    const deepLink = process.argv.find((arg) =>
      arg.startsWith("electron-deliorder://"),
    );
    if (deepLink) {
      handleDeepLink(deepLink);
    }
  });

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}
