import PropTypes from "prop-types";

function NumberInput({ onKeyDownFunc, OnChangeFunc }) {
  return (
    <input
      maxLength="1"
      className="mx-3 h-16 w-16 transform rounded-lg bg-gray-200 text-center text-5xl shadow-md transition duration-200 hover:scale-110 focus:outline-none"
      type="text"
      onKeyDown={(event) => onKeyDownFunc(event)}
      onChange={(event) => OnChangeFunc(event)}
    />
  );
}

NumberInput.propTypes = {
  onKeyDownFunc: PropTypes.func.isRequired,
  OnChangeFunc: PropTypes.func.isRequired,
};

export default NumberInput;
