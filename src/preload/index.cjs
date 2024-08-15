const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFileDialog: async () => {
    try {
      const result = await ipcRenderer.invoke("open-file-dialog");

      return result;
    } catch (error) {
      console.error("Error in openFileDialog:", error);
      return { canceled: true, filePaths: [] };
    }
  },
});
