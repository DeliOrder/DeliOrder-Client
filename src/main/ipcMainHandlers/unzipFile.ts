import { ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import yauzl from "yauzl";
import iconv from "iconv-lite";
import { convertPath } from "../utils/convertPath";

interface Order {
  action: string;
  executionPath: string;
  attachmentName: string;
}

const unzipFile = (): void => {
  ipcMain.handle(
    "unzip-file",
    async (_event: IpcMainInvokeEvent, order: Order): Promise<string> => {
      if (order.action !== "압축해제하기") {
        return "수신받은 행동이 '압축해제하기'가 아닙니다.";
      }

      const fullPath = path.join(order.executionPath, order.attachmentName);
      const convertedFullPath = convertPath(fullPath);

      try {
        await fs.access(convertedFullPath);
      } catch {
        return "해당 위치에 요청한 파일 또는 폴더가 없습니다.";
      }

      let { name } = path.parse(convertedFullPath);
      let newFullPath = path.join(order.executionPath, name);
      let newConvertedFullPath = convertPath(newFullPath);

      while (await fileExists(newConvertedFullPath)) {
        name = getCopyFileName(name);
        newFullPath = path.join(order.executionPath, name);
        newConvertedFullPath = convertPath(newFullPath);
      }

      try {
        const result: string = await new Promise((resolve, reject) => {
          yauzl.open(
            convertedFullPath,
            { lazyEntries: true, decodeStrings: false },
            (error, zipFile) => {
              if (error || !zipFile) {
                console.error("압축해제에 실패했습니다.");
                reject("압축해제 실패");
                return;
              }

              zipFile.readEntry();
              zipFile.on("entry", async (entry) => {
                const fileNameBuffer = Buffer.from(entry.fileName, "binary");
                const decodedFileNameFromWindow = iconv
                  .decode(fileNameBuffer, "cp949")
                  .normalize("NFC");

                const decodedFileNameFromMac = iconv
                  .decode(fileNameBuffer, "utf-8")
                  .normalize("NFC");

                let decodedFileName = decodedFileNameFromMac;

                if (decodedFileName.includes("�")) {
                  decodedFileName = decodedFileNameFromWindow;
                }

                const filePath = path.join(
                  newConvertedFullPath,
                  decodedFileName,
                );

                if (/\/$/.test(decodedFileName)) {
                  await fs.mkdir(filePath, { recursive: true });
                  zipFile.readEntry();
                  return;
                }

                if (
                  decodedFileName.startsWith("__MACOSX/") ||
                  decodedFileName.includes(".DS_Store")
                ) {
                  zipFile.readEntry();
                  return;
                }

                zipFile.openReadStream(entry, async (err, readStream) => {
                  if (err || !readStream) {
                    console.error("압축해제에 실패했습니다.");
                    reject("압축해제 실패");
                    return;
                  }

                  await fs.mkdir(path.dirname(filePath), { recursive: true });

                  const writeStream = createWriteStream(filePath);
                  readStream.pipe(writeStream);

                  readStream.on("end", () => zipFile.readEntry());
                });
              });

              zipFile.on("end", () => {
                resolve("압축해제 성공");
              });
            },
          );
        });

        return result;
      } catch (error) {
        console.error("unzip-file main handler 에러: ", error);
        return "압축해제 실패";
      }
    },
  );
};

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export default unzipFile;
