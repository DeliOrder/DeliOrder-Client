import { VALID_KEY } from "@renderer/constants/validKey";

interface NumberInputProp {
  inputValue: string;
}

function NumberInput({ inputValue = "" }: NumberInputProp) {
  const validateNumber = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const value = (event.target as HTMLInputElement).value.normalize("NFC");
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);

    if (isKorean || !VALID_KEY.includes(value)) {
      (event.target as HTMLInputElement).value = "";
    }
  };

  const shiftFocusOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value && event.code !== "Backspace") {
        (event.target.nextSibling as HTMLInputElement).focus();
        return;
      }

      if (!event.target.value && event.code === "Backspace") {
        (event.target.nextSibling as HTMLInputElement).focus();
      }
    }
  };

  return (
    <input
      maxLength={1}
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

export default NumberInput;
