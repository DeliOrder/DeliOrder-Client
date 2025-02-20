import { ipcMain, dialog } from "electron";
import path from "path";
import os from "os";

const homeDir = os.homedir();

interface FolderDialogResponse {
  attachmentName?: string;
  folderPaths?: string;
  filePaths?: string;
}

const openFolderDialog = (): void => {
  ipcMain.handle(
    "open-folder-dialog",
    async (): Promise<FolderDialogResponse> => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ["openDirectory"],
        });

        if (result.canceled || result.filePaths.length === 0) {
          return { filePaths: "" };
        }

        const selectedFolderPath = result.filePaths[0];
        const relativePath = path.relative(homeDir, selectedFolderPath);
        const { base: attachmentName } = path.parse(relativePath);

        return {
          attachmentName: attachmentName.normalize("NFC"),
          folderPaths: relativePath.normalize("NFC"),
        };
      } catch (error) {
        console.error("open-folder-dialog handler 에러:", error);
        return { filePaths: "" };
      }
    },
  );
};

export default openFolderDialog;
