const os = require("os");
const path = require("path");

const convertPath = (targetPath) => {
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
