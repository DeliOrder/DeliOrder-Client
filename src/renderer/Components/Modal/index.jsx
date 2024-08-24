import PropTypes from "prop-types";

function Modal({ modalConfig }) {
  let { isOpen, title, content, onClose } = modalConfig;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative z-20 flex min-w-[300px] items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <div className="flex-col items-center justify-center">
          <h2 className="mb-4 text-xl font-semibold">{title}</h2>
          {content}
          <button
            type="button"
            onClick={() => onClose()}
            className="button-yellow-square w-24"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalConfig: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.node,
    onClose: PropTypes.func,
  }).isRequired,
};

Modal.defaultProps = {
  modalConfig: {
    onClose: () => {},
  },
};

export default Modal;
