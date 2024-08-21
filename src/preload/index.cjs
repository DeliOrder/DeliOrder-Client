const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFileDialog: async () => {
    try {
      const result = await ipcRenderer.invoke("open-file-dialog");

      return result;
    } catch (error) {
      console.error("Error in openFileDialog:", error);
      return {
        canceled: true,
        filePaths: "",
      };
    }
  },
  deleteFile: async (order) => {
    try {
      await ipcRenderer.invoke("delete-file", order);
    } catch (error) {
      console.error("delete-file renderer error:", error);
    }
  },
  editFileName: async (order) => {
    try {
      await ipcRenderer.invoke("edit-file-name", order);
    } catch (error) {
      console.error("edit-file-name renderer error:", error);
    }
  },
  downloadFile: async (order) => {
    try {
      await ipcRenderer.invoke("download-file", order);
    } catch (error) {
      console.error("Error in downloadFile: ", error);
    }
  },
  moveFile: async (order) => {
    try {
      await ipcRenderer.invoke("move-file", order);
    } catch (error) {
      console.error("Error in moveFile: ", error);
    }
  },
});
