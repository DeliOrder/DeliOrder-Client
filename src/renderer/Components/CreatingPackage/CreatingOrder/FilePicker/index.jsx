import { useState } from "react";

import usePackageStore from "@renderer/store";
import { GUIDE_MESSAGES } from "@renderer/constants/messages";

function FilePicker() {
  const [isPickOptionDefault, setIsPickOptionDefault] = useState(true);
  const { updateOrder, getOrder } = usePackageStore();
  const currentOrder = getOrder();

  const setFileName = (event) => {
    isPickOptionDefault
      ? updateOrder({
          attachmentName: event.target.files[0].name,
          attachmentFile: event.target.files[0],
          attachmentType: "file",
        })
      : updateOrder({
          attachmentName: event.target.value,
          attachmentType: "string",
        });
  };

  return (
    <div className="my-3">
      <label className="label-small">대상파일 선택하기</label>
      <p className="my-1 flex justify-start space-x-4 text-gray-500">
        <span>선택방법 :</span>
        <label>
          <input
            type="radio"
            checked={isPickOptionDefault}
            onChange={() => setIsPickOptionDefault(true)}
          />
          파일선택기
        </label>
        <label>
          <input
            type="radio"
            checked={!isPickOptionDefault}
            onChange={() => setIsPickOptionDefault(false)}
          />
          직접 입력하기
        </label>
      </p>
      {isPickOptionDefault ? (
        <input type="file" className="file-input" onChange={setFileName} />
      ) : (
        <input
          type="text"
          className="input-text focus:shadow-outline file:bg-gray-00"
          placeholder="파일명 입력하기 (예: dog.gif)"
          onChange={setFileName}
        />
      )}
      <p className="text-xs-gray">{GUIDE_MESSAGES.COMPRESSION_NOTICE}</p>
      <p className="text-base-gray">File Name: {currentOrder.attachmentName}</p>
    </div>
  );
}

export default FilePicker;
