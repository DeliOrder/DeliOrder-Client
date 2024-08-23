const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFolderDialog: async () => {
    try {
      const result = await ipcRenderer.invoke("open-folder-dialog");

      return result;
    } catch (error) {
      console.error("Error in openFolderDialog:", error);
      return {
        canceled: true,
        filePaths: "",
      };
    }
  },
  openFileDialog: async () => {
    try {
      const { canceled, attachmentName, fileBase64, mimeType, baseName } =
        await ipcRenderer.invoke("open-file-dialog");

      if (!fileBase64 || !mimeType) {
        return { attachmentName, canceled };
      }

      const fileBuffer = Buffer.from(fileBase64, "base64");
      const arrayBuffer = fileBuffer.buffer.slice(
        fileBuffer.byteOffset,
        fileBuffer.byteOffset + fileBuffer.byteLength,
      );

      const blobObj = new Blob([arrayBuffer], { type: mimeType });
      const fileObj = new File([blobObj], baseName, {
        type: mimeType,
      });

      return { canceled, fileObj, attachmentName };
    } catch (error) {
      console.error("Error in openFolderDialog: ", error);
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
      console.error("delete-file renderer error: ", error);
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
  executeFile: async (order) => {
    try {
      await ipcRenderer.invoke("execute-file", order);
    } catch (error) {
      console.error("Error in replicateFile: ", error);
    }
  },
  replicateFile: async (order) => {
    try {
      await ipcRenderer.invoke("replicate-file", order);
    } catch (error) {
      console.error("Error in replicateFile: ", error);
    }
  },
});
