import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join, resolve } from "path";
import { is } from "@electron-toolkit/utils";
import dotenv from "dotenv";
dotenv.config();

import deleteFile from "./ipcMainHandlers/deleteFile";
import downloadFile from "./ipcMainHandlers/downloadFile";
import editFileName from "./ipcMainHandlers/editFileName";
import executeFile from "./ipcMainHandlers/executeFile";
import getAttachmentName from "./ipcMainHandlers/getAttachmentName";
import moveFile from "./ipcMainHandlers/moveFile";
import openFileDialog from "./ipcMainHandlers/openFileDialog";
import openFolderDialog from "./ipcMainHandlers/openFolderDialog";
import replicateFile from "./ipcMainHandlers/replicateFile";
import unzipFile from "./ipcMainHandlers/unzipFile";

const BASE_URL = process.env.VITE_BASE_URL || "http://localhost:5173";
let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    minWidth: 1440,
    minHeight: 1024,
    autoHideMenuBar: true,
    resizable: true,
    backgroundColor: "#F2F2F2",
    icon: join(__dirname, "../renderer/assets/images/logo.png"),
    roundedCorners: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
}

function handleDeepLink(url: string): void {
  try {
    const urlObj = new URL(url);
    const packageId = urlObj.searchParams.get("packageId");
    if (packageId) {
      mainWindow?.loadURL(
        `${BASE_URL}/package/receiving?packageId=${packageId}`,
      );
    } else {
      mainWindow?.loadURL(`${BASE_URL}/package/receiving`);
    }
  } catch (error) {
    console.error("딥링크 처리 실패:", error);
  }
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("electron-deliorder", process.execPath, [
      resolve(process.argv[1]),
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

  ipcMain.on("ping", () => console.log("pong"));
  deleteFile();
  downloadFile();
  editFileName();
  executeFile();
  getAttachmentName();
  moveFile();
  openFileDialog();
  openFolderDialog();
  replicateFile();
  unzipFile();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
