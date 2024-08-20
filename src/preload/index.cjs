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
  delete: async (order) => {
    try {
      await ipcRenderer.invoke("delete-file", order);
      return;
    } catch {
      console.error("delete-file renderer error:", error);
    }
  },
});
