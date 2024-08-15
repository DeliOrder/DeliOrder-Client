import { useState } from "react";
//filePicker
function FilePicker() {
  const [isPickOptionDefault, setIsPickOptionDefault] = useState(true);
  const [fileName, setFileName] = useState("");

  const getFileName = (event) => {
    isPickOptionDefault
      ? setFileName(event.target.files[0].name)
      : setFileName(event.target.value);
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
        <>
          <input type="file" className="file-input" onChange={getFileName} />
        </>
      ) : (
        <input
          type="text"
          className="input-text focus:shadow-outline file:bg-gray-00"
          placeholder="파일명 입력하기 (예: dog.gif)"
          onChange={getFileName}
        />
      )}
      <p className="text-xs-gray">
        여러개의 파일이 필요할 경우 하나의 파일로 압축하여 사용해 주세요
      </p>
      <p className="text-base-gray">File Name: {fileName}</p>
    </div>
  );
}

export default FilePicker;
