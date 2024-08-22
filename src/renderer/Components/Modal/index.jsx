import PropTypes from "prop-types";

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative z-20 flex min-w-[300px] items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <div className="flex-col items-center justify-center">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default Modal;
