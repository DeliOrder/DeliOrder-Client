const os = require("os");
const path = require("path");

const convertPath = (targetPath) => {
  const platform = os.platform();
  const homeDir = os.homedir();

  const resolvedPath = path.resolve(homeDir, targetPath);

  let convertedPath;

  switch (platform) {
    case "win32":
      if (resolvedPath.startsWith("/Library")) {
        throw new Error("disable path in windows");
      }

      if (resolvedPath.startsWith("../../Applications/")) {
        convertedPath = resolvedPath.replace(
          "../../Applications/",
          "..\\..\\Program Files\\",
        );
      } else {
        convertedPath = resolvedPath;
      }

      break;

    case "darwin":
      if (resolvedPath.startsWith("/AppData")) {
        throw new Error("disable path in macOS");
      }

      if (resolvedPath.startsWith("..\\..\\Program Files\\")) {
        convertedPath = resolvedPath.replace(
          "..\\..\\Program Files\\",
          "../../Applications/",
        );
      } else {
        convertedPath = resolvedPath;
      }

      break;
  }

  path.normalize(convertedPath);
};

module.exports = { convertPath };
