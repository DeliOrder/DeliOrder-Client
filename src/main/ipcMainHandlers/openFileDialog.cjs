const { ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

const homeDir = os.homedir();

const openFileDialog = () => {
  ipcMain.handle("open-file-dialog", async (event, action) => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        ...(action === "압축해제하기" && {
          filters: [
            {
              name: "ZIP Files",
              extensions: ["zip"],
            },
          ],
        }),
      });
      const selectedFilePath = result.filePaths[0];
      const relativeFilePath = path.relative(homeDir, selectedFilePath);
      const relativeFileFolder = path.dirname(relativeFilePath);
      const { base: attachmentName, ext: extension } =
        path.parse(selectedFilePath);

      if (action === "압축해제하기" && extension !== ".zip") {
        console.error("해당 파일이 zip 파일이 아닙니다");
        return;
      }

      if (action !== "생성하기") {
        return {
          attachmentName: attachmentName.normalize("NFC"),
          relativePath: relativeFileFolder.normalize("NFC"),
        };
      }

      const mime = (await import("mime")).default;
      const fileBuffer = fs.readFileSync(selectedFilePath);
      const baseName = path.basename(selectedFilePath);
      const fileBase64 = fileBuffer.toString("base64");
      const mimeType = mime.getType(extension);

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
  });
};

openFileDialog();
