import { useCallback, useState } from "react";

const useModalConfig = () => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    content: "",
    onClose: null,
  });

  const defaultCloseAction = () => {
    setModalConfig((previousConfig) => ({
      ...previousConfig,
      isOpen: false,
    }));
  };

  const [isInitialized, setInitialized] = useState(false);
  /**
   * 모달 값을 설정함과 동시에 모달을 열어주는 함수.
   * @param {string | React.ReactNode} content - <Modal>{content}</Modal>
   * @param {string} title - 모달의 제목
   * @param {function} onClose - '모달 닫기' 이외에 수행 되어야할 동작함수
   */
  const openModal = useCallback(
    (content, title = "", onClose = null) => {
      if (!isInitialized) {
        setModalConfig({
          isOpen: true,
          title,
          content,
          onClose: () => {
            if (onClose) {
              onClose();
            }
            defaultCloseAction();
          },
        });

        setInitialized(true);
      } else {
        setModalConfig((previousConfig) => ({
          ...previousConfig,
          isOpen: true,
        }));
      }
    },
    [isInitialized],
  );

  /**
   * openModal 에서 설정한 onClose 함수를 실행 후 모달을 닫습니다.
   */
  const closeModal = useCallback(() => {
    setModalConfig((previousConfig) => {
      if (previousConfig.onClose) {
        previousConfig.onClose();
      } else {
        defaultCloseModal();
      }

      return previousConfig;
    });
  }, []);

  return {
    modalConfig,
    openModal,
    closeModal,
  };
};

export default useModalConfig;
