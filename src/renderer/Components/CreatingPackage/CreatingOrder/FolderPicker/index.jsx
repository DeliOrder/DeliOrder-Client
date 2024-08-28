import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import usePackageStore from "@renderer/store";
import { PLACEHOLDER } from "@renderer/constants/messages";

function FolderPicker({ isOptional }) {
  const { updateOrder, getOrder, setClientStatus, clientStatus } =
    usePackageStore();
  const currentOrder = getOrder();

  const pathType = isOptional ? "sourcePath" : "executionPath";
  const description = isOptional ? "출발경로" : "목적경로";

  useEffect(() => {
    if (clientStatus.isSubmitted) {
      updateOrder({ [pathType]: "" });
      setClientStatus({ isSubmitted: false });
    }
  }, [clientStatus.isSubmitted, setClientStatus]);

  useEffect(() => {
    const updateAttachmentName = (path) => {
      const pathArray = path.split("/");
      const attachmentName = pathArray[pathArray.length - 1];

      updateOrder({ attachmentName });
    };

    if (currentOrder.sourcePath && !clientStatus.isPickFile) {
      updateAttachmentName(currentOrder.sourcePath);
    }
  }, [
    currentOrder.sourcePath,
    currentOrder.executionPath,
    clientStatus.isPickFile,
    updateOrder,
  ]);

  const openFolderPicker = async () => {
    try {
      const { folderPaths, attachmentName } =
        await window.electronAPI.openFolderDialog();

      if (!clientStatus.isPickFile) {
        updateOrder({ attachmentName, attachmentType: "folder" });
      }

      updateOrder({ [pathType]: folderPaths });
    } catch (error) {
      console.error("폴더 경로를 여는 중 에러가 발생 :", error);
    }
  };

  const appendUserPath = (event) => {
    const userDefinedPath = event.target.value;

    updateOrder({ [pathType]: userDefinedPath });
  };

  return (
    <div className="my-3">
      <label className="label-small">{description} 선택하기</label>
      <button
        type="button"
        className="input-base focus:shadow-outline"
        onClick={openFolderPicker}
      >
        {PLACEHOLDER.FOLDER_PICKER}
      </button>
      <input
        type="text"
        className="input-text focus:shadow-outline"
        placeholder={PLACEHOLDER.PATH_USER_DEFINE}
        value={currentOrder[pathType]}
        onChange={appendUserPath}
      />
      <p className="text-base-gray">
        {description} : {currentOrder[pathType]}
      </p>
    </div>
  );
}

FolderPicker.propTypes = {
  isOptional: PropTypes.bool.isRequired,
};

export default FolderPicker;
