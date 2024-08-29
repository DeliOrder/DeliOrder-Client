const { app, BrowserWindow } = require("electron");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

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

const { handleDeepLink } = require("./utils/handleDeeplink.cjs");
const {
  setDefaultProtocolClient,
} = require("./utils/setDefaultProtocolClient.cjs");

let mainWindow;

const BASE_URL = process.env.VITE_BASE_URL;
const PROTOCOL_NAME = "electron-deliorder";

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 1600,
    minHeight: 900,
    autoHideMenuBar: true,
    resizable: true,
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

  mainWindow.loadURL(BASE_URL);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
};

setDefaultProtocolClient(app, PROTOCOL_NAME);

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  return app.quit();
}

app.on("second-instance", (event, commandLine, workingDirectory) => {
  if (!mainWindow) {
    return createWindow();
  }

  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();

  const deepLink = commandLine.find((cmd) =>
    cmd.startsWith(`${PROTOCOL_NAME}://`),
  );

  if (deepLink) {
    handleDeepLink(deepLink, BASE_URL, mainWindow);
  }
});

app.on("ready", () => {
  createWindow();

  const deepLink = process.argv.find((arg) =>
    arg.startsWith(`${PROTOCOL_NAME}://`),
  );
  if (deepLink) {
    handleDeepLink(deepLink, BASE_URL, mainWindow);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
