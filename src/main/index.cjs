const { app, BrowserWindow } = require("electron");
require("dotenv").config();

const createWindow = () => {
  const BASE_URL = process.env.VITE_BASE_URL;
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  win.loadURL(BASE_URL);
};

app.whenReady().then(() => {
  createWindow();
});
