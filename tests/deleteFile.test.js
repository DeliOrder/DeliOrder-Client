const fs = require("fs");
const path = require("path");
const { ipcMain, ipcRenderer } = require("electron");

jest.mock("electron", () => ({
  ipcMain: {
    handle: jest.fn(),
  },
  ipcRenderer: {
    invoke: jest.fn(),
  },
}));

describe("ipaMain handler 함수 테스트 ", () => {
  beforeEach(() => {
    require("..src/main/ipcMainHandlers/deleteFile.cjs");
  });

  it("삭제하기는 지정한 경로의 파일을 삭제해야 합니다.", async () => {});
});
