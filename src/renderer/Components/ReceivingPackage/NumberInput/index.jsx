import PropTypes from "prop-types";

function NumberInput({ inputNumbers, setInputNumbers, index }) {
  const validateNumber = (event) => {
    const VALID_KEY = [
      "Tab",
      "Backspace",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];

    if (!VALID_KEY.includes(event.key) || event.key === " ") {
      event.preventDefault();
    }
  };

  const updateInputNumbers = (event, index) => {
    if (!isNaN(event.key) && event.key.trim() !== "") {
      const tempNumbers = [...inputNumbers];
      tempNumbers[index] = event.key;
      setInputNumbers(tempNumbers);
    }
  };

  const handleFocusShift = (event) => {
    if (event.nativeEvent.data === null) {
      event.target.previousSibling?.focus();
      return;
    }

    if (event) {
      event.target.nextSibling?.focus();
    }
  };

  return (
    <input
      maxLength="1"
      className="mx-3 h-16 w-16 transform rounded-lg bg-gray-200 text-center text-5xl shadow-md transition duration-200 hover:scale-110 focus:outline-none"
      type="text"
      onKeyDown={(event) => {
        validateNumber(event);
        updateInputNumbers(event, index);
      }}
      onChange={handleFocusShift}
    />
  );
}

NumberInput.propTypes = {
  inputNumbers: PropTypes.array.isRequired,
  setInputNumbers: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default NumberInput;
