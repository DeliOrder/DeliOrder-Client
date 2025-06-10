import { contextBridge, ipcRenderer } from "electron";

interface FileDialogResult {
  filePaths?: string;
  attachmentName?: string;
  relativePath?: string;
  fileObj?: File;
}

const api = {
  openFolderDialog: async (): Promise<FileDialogResult> => {
    try {
      return await ipcRenderer.invoke("open-folder-dialog");
    } catch (error) {
      console.error("Error in openFolderDialog:", error);
      return { filePaths: "" };
    }
  },
  openFileDialog: async (action: string): Promise<FileDialogResult> => {
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
      const fileObj = new File([blobObj], baseName, { type: mimeType });

      return { fileObj, attachmentName, relativePath };
    } catch (error) {
      console.error("Error in openFileDialog:", error);
      return { filePaths: "" };
    }
  },
  deleteFile: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("delete-file", order);
    } catch (error) {
      console.error("delete-file renderer error:", error);
    }
  },
  editFileName: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("edit-file-name", order);
    } catch (error) {
      console.error("edit-file-name renderer error:", error);
    }
  },
  downloadFile: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("download-file", order);
    } catch (error) {
      console.error("Error in downloadFile:", error);
    }
  },
  moveFile: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("move-file", order);
    } catch (error) {
      console.error("Error in moveFile:", error);
    }
  },
  executeFile: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("execute-file", order);
    } catch (error) {
      console.error("Error in executeFile:", error);
    }
  },
  replicateFile: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("replicate-file", order);
    } catch (error) {
      console.error("Error in replicateFile:", error);
    }
  },
  unzipFile: async (order: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("unzip-file", order);
    } catch (error) {
      console.error("Error in unzipFile:", error);
    }
  },
  getAttachmentName: async (path: string): Promise<string | void> => {
    try {
      return await ipcRenderer.invoke("get-attachmentName", path);
    } catch (error) {
      console.error("Error in get-attachmentName:", error);
    }
  },
  onKakaoAuthCode: (callback: (code: string) => void) => {
    ipcRenderer.on("kakao-auth-code", (_, code) => callback(code));
  },
  startKakaoLogin: () => ipcRenderer.invoke("start-kakao-login"),
};

contextBridge.exposeInMainWorld("api", api);

export type ApiType = typeof api;
