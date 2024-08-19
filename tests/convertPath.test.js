/* eslint-disable */
const { convertPath } = require("../src/main/utils/convertPath.cjs");

const testerHomeDir = {
  windows: "C:\\Users\\janej",
  macOS: "/Users/coco/",
};

const windowsPathSample = {
  documents: "Documents\\Projects\\Code",
  downloads: "Downloads\\Images",
  desktop: "Desktop\\Notes",
  appData: "AppData\\Local\\MyApp",
  programFiles: "..\\..\\Program Files\\MyApp\\bin",
};

const macOsPathSample = {
  documents: "Documents/Projects/Code",
  downloads: "Downloads/Images",
  desktop: "Desktop/Notes",
  programFiles: "../../Applications/Utilities",
};

test("macOS to macOS", () => {
  expect(convertPath(macOsPathSample.documents)).toBe(
    testerHomeDir.macOS + macOsPathSample.documents,
  );
  expect(convertPath(macOsPathSample.downloads)).toBe(
    testerHomeDir.macOS + macOsPathSample.downloads,
  );
  expect(convertPath(macOsPathSample.desktop)).toBe(
    testerHomeDir.macOS + macOsPathSample.desktop,
  );
  expect(convertPath(macOsPathSample.programFiles)).toBe(
    "/Applications/Utilities",
  );
});

test("windows to macOS", () => {
  expect(convertPath(windowsPathSample.documents)).toBe(
    testerHomeDir.macOS + macOsPathSample.documents,
  );
  expect(convertPath(windowsPathSample.downloads)).toBe(
    testerHomeDir.macOS + macOsPathSample.downloads,
  );
  expect(convertPath(windowsPathSample.desktop)).toBe(
    testerHomeDir.macOS + macOsPathSample.desktop,
  );
  expect(convertPath(windowsPathSample.programFiles)).toBe(
    "../../Applications/MyApp/bin",
  );
});
/* eslint-enable */
