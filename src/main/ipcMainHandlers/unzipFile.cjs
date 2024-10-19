const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const yauzl = require("yauzl");
const iconv = require("iconv-lite");

const { getCopyFileName } = require("../utils/getCopyFileName.cjs");
const { convertPath } = require("../utils/convertPath.cjs");

const unzipFile = () => {
  ipcMain.handle("unzip-file", async (event, order) => {
    if (order.action !== "압축해제하기") {
      return "수신받은 행동이 '압축해제하기'가 아닙니다.";
    }

    const fullPath = path.join(order.executionPath, order.attachmentName);
    const convertedFullPath = convertPath(fullPath);

    if (!fs.existsSync(convertedFullPath)) {
      return "해당 위치에 요청한 파일 또는 폴더가 없습니다.";
    }

    let { name } = path.parse(convertedFullPath);
    let newFullPath = path.join(order.executionPath, name);
    let newConvertedFullPath = convertPath(newFullPath);

    while (fs.existsSync(newConvertedFullPath)) {
      name = getCopyFileName(name);

      newFullPath = path.join(order.executionPath, name);
      newConvertedFullPath = convertPath(newFullPath);
    }

    try {
      const result = await new Promise((resolve, reject) => {
        yauzl.open(
          convertedFullPath,
          { lazyEntries: true, decodeStrings: false },
          (error, zipFile) => {
            if (error) {
              console.error("압축해제에 실패했습니다.");
              reject("압축해제 실패");
              return;
            }

            zipFile.readEntry();
            zipFile.on("entry", (entry) => {
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

              const filePath = path.join(newConvertedFullPath, decodedFileName);

              if (/\/$/.test(decodedFileName)) {
                fs.mkdirSync(filePath, { recursive: true });
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

              zipFile.openReadStream(entry, (error, readStream) => {
                if (error) {
                  console.error("압축해제에 실패했습니다.");
                  reject("압축해제 실패");
                  return;
                }

                fs.mkdirSync(path.dirname(filePath), {
                  recursive: true,
                });

                readStream.pipe(fs.createWriteStream(filePath));
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
  });
};

unzipFile();
