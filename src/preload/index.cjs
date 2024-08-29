const { contextBridge, ipcRenderer } = require("electron");
// const path = require("path");

contextBridge.exposeInMainWorld("electronAPI", {
  openFolderDialog: async () => {
    try {
      return await ipcRenderer.invoke("open-folder-dialog");
    } catch (error) {
      console.error("Error in openFolderDialog:", error);
      return { filePaths: "" };
    }
  },
  openFileDialog: async (action) => {
    try {
      const { attachmentName, relativePath, fileBase64, mimeType, baseName } =
        await ipcRenderer.invoke("open-file-dialog", action);

      if (action !== "생성하기") {
        return { attachmentName, relativePath };
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

      return { fileObj, attachmentName, relativePath };
    } catch (error) {
      console.error("Error in openFolderDialog: ", error);
      return { filePaths: "" };
    }
  },
  deleteFile: async (order) => {
    try {
      return await ipcRenderer.invoke("delete-file", order);
    } catch (error) {
      console.error("delete-file renderer error: ", error);
    }
  },
  editFileName: async (order) => {
    try {
      return await ipcRenderer.invoke("edit-file-name", order);
    } catch (error) {
      console.error("edit-file-name renderer error:", error);
    }
  },
  downloadFile: async (order) => {
    try {
      return await ipcRenderer.invoke("download-file", order);
    } catch (error) {
      console.error("Error in downloadFile: ", error);
    }
  },
  moveFile: async (order) => {
    try {
      return await ipcRenderer.invoke("move-file", order);
    } catch (error) {
      console.error("Error in moveFile: ", error);
    }
  },
  executeFile: async (order) => {
    try {
      return await ipcRenderer.invoke("execute-file", order);
    } catch (error) {
      console.error("Error in replicateFile: ", error);
    }
  },
  replicateFile: async (order) => {
    try {
      return await ipcRenderer.invoke("replicate-file", order);
    } catch (error) {
      console.error("Error in replicateFile: ", error);
    }
  },
  unzipFile: async (order) => {
    try {
      return await ipcRenderer.invoke("unzip-file", order);
    } catch (error) {
      console.error("Error in unzipFile: ", error);
    }
  },
  getAttachmentName: async (path) => {
    try {
      return await ipcRenderer.invoke("get-attachmentName", path);
    } catch (error) {
      console.error("Error in get-attachmentName: ", error);
    }
  },
});
