import usePackageStore from "@renderer/store";
import { GUIDE_MESSAGES } from "@renderer/constants/messages";

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
      const { attachmentName, canceled, fileObj } =
        await window.electronAPI.openFileDialog(currentOrder.action);

      if (canceled || (currentOrder.action === "생성하기" && !fileObj)) {
        console.error("폴더 선택이 취소되었습니다.");
        return;
      }

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
        대상 선택하기:
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
            <span>선택방법 :</span>
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
          <p className="text-base-gray">
            File Name: {currentOrder.attachmentName}
          </p>
        </>
      )}
    </div>
  );
}

export default FilePicker;
