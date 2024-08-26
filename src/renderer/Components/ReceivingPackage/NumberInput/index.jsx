function NumberInput() {
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
  const shiftFocusOnKeyDown = (event) => {
    if (event.target.value && event.code !== "Backspace") {
      event.target.nextSibling?.focus();
      return;
    }

    if (!event.target.value && event.code === "Backspace") {
      event.target.previousSibling?.focus();
    }
  };

  const shiftFocusOnChange = (event) => {
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
        shiftFocusOnKeyDown(event);
      }}
      onChange={shiftFocusOnChange}
    />
  );
}

export default NumberInput;
