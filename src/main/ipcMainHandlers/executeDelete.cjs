const { ipcMain } = require("electron");
const path = require("path");

const { convertPath } = require("../utils/convertPath.cjs");

const executeDelete = () => {
  ipcMain.handle("delete-file", async (event, order) => {
    try {
      const fullPath = path.join(order.executionPath, order.attachmentName);
      const filePath = convertPath(fullPath);

      const trash = (await import("trash")).default;
      await trash(filePath);

      return;
    } catch (error) {
      console.error("delete-file main handler error:", error);
    }
  });
};
module.exports = { executeDelete };
