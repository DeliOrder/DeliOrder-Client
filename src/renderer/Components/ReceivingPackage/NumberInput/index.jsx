import { VALID_KEY } from "@renderer/constants/validKey";
import PropTypes from "prop-types";

function NumberInput({ inputValue = "" }) {
  const validateNumber = (event) => {
    const value = event.target.value.normalize("NFC");
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);

    if (isKorean || !VALID_KEY.includes(value)) {
      event.target.value = "";
    }
  };

  const shiftFocusOnKeyDown = (event) => {
    if (event.target.value && event.code !== "Backspace") {
      event.target.nextSibling?.focus();
      return;
    }

    if (!event.target.value && event.code === "Backspace") {
      event.target.previousSibling?.focus();
    }
  };

  return (
    <input
      maxLength="1"
      className="mx-3 h-20 w-20 transform rounded-lg bg-gray-200 text-center text-5xl shadow-md transition duration-200 hover:scale-110 focus:outline-none"
      type="text"
      onKeyDown={(event) => {
        validateNumber(event);
        shiftFocusOnKeyDown(event);
      }}
      defaultValue={inputValue}
      onChange={validateNumber}
    />
  );
}

NumberInput.propTypes = {
  inputValue: PropTypes.string,
};

export default NumberInput;
