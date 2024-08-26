import Modal from ".";

import usePackageStore from "../../store";

function InfoModal() {
  const { infoModal, closeInfoModal } = usePackageStore();

  return (
    <Modal title="알림" isOpen={infoModal.isOpen} onClose={closeInfoModal}>
      <p className="mt-2 text-xs">{infoModal.message}</p>
    </Modal>
  );
}

export default InfoModal;
