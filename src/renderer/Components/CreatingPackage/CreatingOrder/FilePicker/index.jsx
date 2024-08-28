import usePackageStore from "@renderer/store";
import { GUIDE_MESSAGES, PLACEHOLDER } from "@renderer/constants/messages";

function FilePicker() {
  const { updateOrder, getOrder, getClientStatus, setClientStatus } =
    usePackageStore();
  const currentOrder = getOrder();
  const { isPickFile, isUsingFilePicker } = getClientStatus();

  const setFileInfo = (event) => {
    updateOrder({
      attachmentName: event.target.value,
      attachmentType: "string",
    });
  };

  const openFilePicker = async () => {
    try {
      const { attachmentName, fileObj } =
        await window.electronAPI.openFileDialog(currentOrder.action);

      updateOrder({
        attachmentName: attachmentName,
        attachmentFile: fileObj,
        attachmentType: "file",
      });
    } catch (error) {
      console.error("폴더 경로를 여는 중 에러가 발생 :", error);
    }
  };

  return (
    <div className="my-3">
      <label className="label-small flex gap-4">
        대상 선택하기
        <label>
          <input
            type="radio"
            checked={isPickFile}
            onChange={() => setClientStatus({ isPickFile: true })}
          />
          파일
        </label>
        {currentOrder.action !== "생성하기" &&
          currentOrder.action !== "압축해제하기" && (
            <label>
              <input
                type="radio"
                checked={!isPickFile}
                onChange={() => setClientStatus({ isPickFile: false })}
              />
              폴더
            </label>
          )}
      </label>
      {isPickFile && (
        <>
          <div className="my-1 flex justify-start space-x-4 text-gray-500">
            <span className="font-semibold">선택방법 :</span>
            <label>
              <input
                type="radio"
                checked={isUsingFilePicker}
                onChange={() => setClientStatus({ isUsingFilePicker: true })}
              />
              파일선택기
            </label>
            {currentOrder.action !== "생성하기" &&
              currentOrder.action !== "압축해제하기" && (
                <label>
                  <input
                    type="radio"
                    checked={!isUsingFilePicker}
                    onChange={() =>
                      setClientStatus({ isUsingFilePicker: false })
                    }
                  />
                  직접 입력하기
                </label>
              )}
          </div>
          {isUsingFilePicker ? (
            <button
              type="button"
              className="input-base focus:shadow-outline"
              onClick={openFilePicker}
            >
              {PLACEHOLDER.FILE_PICKER}
            </button>
          ) : (
            <input
              type="text"
              className="input-text focus:shadow-outline file:bg-gray-00"
              placeholder={PLACEHOLDER.FILE_USER_DEFINE}
              onChange={setFileInfo}
            />
          )}
          <p className="text-xs-gray">{GUIDE_MESSAGES.COMPRESSION_NOTICE}</p>
          <p className="text-base-gray">
            파일이름: {currentOrder.attachmentName}
          </p>
        </>
      )}
    </div>
  );
}

export default FilePicker;
