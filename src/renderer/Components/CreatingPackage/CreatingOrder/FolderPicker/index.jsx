import { useEffect, useState } from "react";
import usePackageStore from "../../../../store";
import PropTypes from "prop-types";

function FolderPicker({ isOptional }) {
  const [filePath, setFilePath] = useState("");
  const { updateOrder, getOrder, setClientStatus, clientStatus } =
    usePackageStore();
  const currentOrder = getOrder();

  const savingPathName = isOptional ? "originalPath" : "destinationPath";
  const description = isOptional ? "출발" : "목적";

  useEffect(() => {
    if (clientStatus.isSubmitted) {
      setFilePath("");
      setClientStatus({ isSubmitted: false });
    }
  }, [clientStatus.isSubmitted]);

  const openFolderPicker = async () => {
    try {
      const { canceled, filePaths } = await window.electronAPI.openFileDialog();
      if (!canceled && filePaths.length > 0) {
        const selectedPath = filePaths[0];

        setFilePath(selectedPath);
        updateOrder({ [savingPathName]: selectedPath });
      }
    } catch (error) {
      console.error("Error opening file dialog:", error);
    }
  };

  const appendUserPath = (event) => {
    const userDefinedPath = event.target.value;
    updateOrder({ [savingPathName]: filePath + userDefinedPath });
  };

  const displayedPath = currentOrder[savingPathName] || filePath;

  return (
    <div className="my-3">
      <label className="label-small">{description}경로 선택하기</label>
      <button
        type="button"
        className="input-base focus:shadow-outline"
        onClick={openFolderPicker}
      >
        경로를 선택해 주세요.
      </button>
      <input
        type="text"
        className="input-text focus:shadow-outline"
        placeholder="추가 경로 입력하기"
        onChange={appendUserPath}
      />
      <p className="text-base-gray">
        {savingPathName} : {displayedPath}
      </p>
    </div>
  );
}

FolderPicker.propTypes = {
  isOptional: PropTypes.bool.isRequired,
};

export default FolderPicker;
