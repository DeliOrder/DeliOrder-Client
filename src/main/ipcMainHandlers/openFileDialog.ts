import { ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs/promises";
import os from "os";
import mime from "mime";

const homeDir = os.homedir();

interface FileDialogResponse {
  attachmentName?: string;
  relativePath?: string;
  selectedFilePath?: string;
  fileBase64?: string;
  baseName?: string;
  mimeType?: string | null;
  filePaths?: string;
}

const openFileDialog = (): void => {
  ipcMain.handle(
    "open-file-dialog",
    async (_event, action: string): Promise<FileDialogResponse> => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ["openFile"],
          ...(action === "압축해제하기" && {
            filters: [{ name: "ZIP Files", extensions: ["zip"] }],
          }),
        });

        if (result.canceled || result.filePaths.length === 0) {
          return { filePaths: "" };
        }

        const selectedFilePath = result.filePaths[0];
        const relativeFilePath = path.relative(homeDir, selectedFilePath);
        const relativeFileFolder = path.dirname(relativeFilePath);
        const { base: attachmentName, ext: extension } =
          path.parse(selectedFilePath);

        if (action === "압축해제하기" && extension !== ".zip") {
          console.error("해당 파일이 zip 파일이 아닙니다");
          return { filePaths: "" };
        }

        if (action !== "생성하기") {
          return {
            attachmentName: attachmentName.normalize("NFC"),
            relativePath: relativeFileFolder.normalize("NFC"),
          };
        }

        const fileBuffer = await fs.readFile(selectedFilePath);
        const baseName = path.basename(selectedFilePath);
        const fileBase64 = fileBuffer.toString("base64");
        const mimeType = mime.getType(extension) || "application/octet-stream";

        return {
          selectedFilePath,
          attachmentName: attachmentName.normalize("NFC"),
          fileBase64: fileBase64.normalize("NFC"),
          relativePath: relativeFileFolder.normalize("NFC"),
          baseName,
          mimeType,
        };
      } catch (error) {
        console.error("open-file-dialog handler 에러:", error);
        return { filePaths: "" };
      }
    },
  );
};

export default openFileDialog;
