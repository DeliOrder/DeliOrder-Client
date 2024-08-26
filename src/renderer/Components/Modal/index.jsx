import PropTypes from "prop-types";

function Modal({ title = "", isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative z-20 flex min-w-[300px] items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <div className="flex-col content-center items-center">
          <h2 className="mb-4 text-xl font-semibold">{title}</h2>
          {children}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="button-yellow-square mt-5 w-24"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default Modal;
