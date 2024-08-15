import { useState } from "react";

function FolderPicker() {
  const [filePath, setFilePath] = useState("");
  const [fullPath, setFullPath] = useState("");

  const openFile = async () => {
    try {
      const result = await window.electronAPI.openFileDialog();

      if (!result.canceled && result.filePaths.length > 0) {
        setFilePath(result.filePaths[0]);
      }
    } catch (error) {
      console.error("Error opening file dialog:", error);
    }
  };

  const getUserDefinedPath = (event) => {
    const userDefinedPath = event.target.value;
    setFullPath(filePath + userDefinedPath);
  };

  return (
    <>
      <label className="label-small">경로 선택하기</label>
      <button
        type="button"
        className="input-base focus:shadow-outline"
        onClick={openFile}
      >
        경로를 선택해 주세요.
      </button>
      <input
        type="text"
        className="input-text focus:shadow-outline"
        placeholder="추가 경로 입력하기"
        onChange={getUserDefinedPath}
      />
      <p className="text-base-gray">
        File path: {fullPath.length === 0 ? filePath : fullPath}
      </p>
    </>
  );
}
export default FolderPicker;
