import PropTypes from "prop-types";

function InfoModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative z-20 flex min-w-[300px] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <div className="flex-col items-center justify-center">{children}</div>
        <button
          className="focus:shadow-outline mt-4 rounded-md bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-500"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

InfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default InfoModal;
