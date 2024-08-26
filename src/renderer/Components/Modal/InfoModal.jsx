import Modal from ".";

import usePackageStore from "../../store";

function InfoModal() {
  const { infoModal, closeInfoModal } = usePackageStore();

  return (
    <Modal title="알림" isOpen={infoModal.isOpen} onClose={closeInfoModal}>
      <div className="mt-2 text-xs">{infoModal.message}</div>
    </Modal>
  );
}

export default InfoModal;
