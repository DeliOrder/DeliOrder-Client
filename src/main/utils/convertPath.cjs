const os = require("os");
const path = require("path");

const convertPath = (targetPath) => {
  const onlyInMacOs = "../../Library";
  const onlyInWindows = "AppData";

  if (
    targetPath.startsWith(onlyInMacOs) ||
    targetPath.startsWith(onlyInWindows)
  )
    return;

  const platform = os.platform();
  const homeDir = os.homedir();

  let convertedPath;

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

  const normalizedPath = normalizePath(convertedPath);

  return normalizedPath;
};

const normalizePath = (filePath) => {
  const currentOS = os.platform();

  if (currentOS === "darwin") {
    return filePath.split("\\").join("/");
  } else {
    return filePath.split("/").join("\\");
  }
};

module.exports = { convertPath };
