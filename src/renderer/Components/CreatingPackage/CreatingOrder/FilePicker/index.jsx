import { useState } from "react";

import usePackageStore from "@renderer/store";
import { GUIDE_MESSAGES } from "@renderer/constants/messages";

function FilePicker() {
  const [isPickOptionDefault, setIsPickOptionDefault] = useState(true);
  const { updateOrder, getOrder } = usePackageStore();
  const currentOrder = getOrder();

  const setFileInfo = (event) => {
    updateOrder({
      attachmentName: event.target.value,
      attachmentType: "string",
    });
  };
  const openFilePicker = async () => {
    try {
      const { attachmentName, canceled, fileObj } =
        await window.electronAPI.openFileDialog();

      if (canceled || (currentOrder.action === "생성하기" && !fileObj)) {
        console.error("폴더 선택이 취소되었습니다.");
        return;
      }

      updateOrder({
        attachmentName: attachmentName,
        attachmentFile: fileObj,
        attachmentType: "file",
      });

      updateOrder({ attachmentName, attachmentType: "file" });
    } catch (error) {
      console.error("폴더 경로를 여는 중 에러가 발생 :", error);
    }
  };

  return (
    <div className="my-3">
      <label className="label-small">대상파일 선택하기</label>
      <div className="my-1 flex justify-start space-x-4 text-gray-500">
        <span>선택방법 :</span>
        <label>
          <input
            type="radio"
            checked={isPickOptionDefault}
            onChange={() => setIsPickOptionDefault(true)}
          />
          파일선택기
        </label>
        {currentOrder.action !== "생성하기" && (
          <label>
            <input
              type="radio"
              checked={!isPickOptionDefault}
              onChange={() => setIsPickOptionDefault(false)}
            />
            직접 입력하기
          </label>
        )}
      </div>
      {isPickOptionDefault ? (
        <button
          type="button"
          className="input-base focus:shadow-outline"
          onClick={openFilePicker}
        >
          파일을 선택해 주세요.
        </button>
      ) : (
        <input
          type="text"
          className="input-text focus:shadow-outline file:bg-gray-00"
          placeholder="파일명 입력하기 (예: dog.gif)"
          onChange={setFileInfo}
        />
      )}
      <p className="text-xs-gray">{GUIDE_MESSAGES.COMPRESSION_NOTICE}</p>
      <p className="text-base-gray">File Name: {currentOrder.attachmentName}</p>
    </div>
  );
}

export default FilePicker;
