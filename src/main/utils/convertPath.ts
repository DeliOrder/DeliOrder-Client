import os from "os";
import path from "path";

export const convertPath = (targetPath: string): string => {
  const platform = os.platform();
  const homeDir = os.homedir();

  const onlyInMacOs = "../../Library";
  const onlyInWindows = "AppData";

  if (
    (targetPath.startsWith(onlyInMacOs) && platform !== "darwin") ||
    (targetPath.startsWith(onlyInWindows) && platform !== "win32")
  ) {
    throw new Error("해당 경로는 현재 운영 체제에서 사용할 수 없습니다.");
  }

  let convertedPath: string;

  switch (platform) {
    case "win32":
      if (targetPath.startsWith("../../Applications/")) {
        convertedPath = targetPath.replace(
          "../../Applications/",
          "..\\..\\Program Files\\",
        );
      } else {
        convertedPath = path.join(homeDir, targetPath);
      }
      break;

    case "darwin":
      if (targetPath.startsWith("..\\..\\Program Files\\")) {
        convertedPath = targetPath.replace(
          "..\\..\\Program Files\\",
          "../../Applications/",
        );
      } else if (targetPath.startsWith("..\\..\\Program Files (x86)\\")) {
        convertedPath = targetPath.replace(
          "..\\..\\Program Files (x86)\\",
          "../../Applications/",
        );
      } else {
        convertedPath = path.join(homeDir, targetPath);
      }
      break;

    default:
      convertedPath = path.join(homeDir, targetPath);
  }

  const normalizedPath = normalizePath(convertedPath).normalize("NFC");

  return normalizedPath;
};

export const normalizePath = (filePath: string): string => {
  const currentOS = os.platform();
  return currentOS === "darwin"
    ? filePath.split("\\").join("/")
    : filePath.split("/").join("\\");
};
