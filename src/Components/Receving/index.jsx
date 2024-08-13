function Receiving() {
  const validateNumber = (event) => {
    if (
      (Number.isNaN(+event.key) &&
        event.key !== "Tab" &&
        event.key !== "Backspace") ||
      event.key === " "
    ) {
      event.preventDefault();
    }
  };

  const handleMoveNextInput = (event) => {
    if (event.nativeEvent.data === null) {
      event.target.previousSibling?.focus();
      return;
    }
    if (event) {
      event.target.nextSibling?.focus();
    }
  };

  return (
    <div className="flex bg-blue-100 justify-center items-center h-[90.5vh]">
      <form className="flex-col gap-20 items-center w-3/5 h-3/5 flex rounded-xl bg-white p-10 shadow-2xl">
        <label className="text-6xl text-gray-800 font-semibold tracking-wide">
          일련번호
        </label>
        <div className="flex justify-center">
          <input
            maxLength="1"
            className="bg-gray-200 w-16 h-16 text-5xl text-center rounded-lg mx-3 shadow-md transform transition duration-200 hover:scale-110 focus:outline-none "
            type="text"
            onKeyDown={validateNumber}
            onChange={handleMoveNextInput}
          />
          <input
            maxLength="1"
            className="bg-gray-200 w-16 h-16 text-5xl text-center rounded-lg mx-3 shadow-md transform transition duration-200 hover:scale-110 focus:outline-none "
            type="text"
            onKeyDown={validateNumber}
            onChange={handleMoveNextInput}
          />
          <input
            maxLength="1"
            className="bg-gray-200 w-16 h-16 text-5xl text-center rounded-lg mx-3 shadow-md transform transition duration-200 hover:scale-110 focus:outline-none "
            type="text"
            onKeyDown={validateNumber}
            onChange={handleMoveNextInput}
          />
          <input
            maxLength="1"
            className="bg-gray-200 w-16 h-16 text-5xl text-center rounded-lg mx-3 shadow-md transform transition duration-200 hover:scale-110 focus:outline-none "
            type="text"
            onKeyDown={validateNumber}
            onChange={handleMoveNextInput}
          />
          <input
            maxLength="1"
            className="bg-gray-200 w-16 h-16 text-5xl text-center rounded-lg mx-3 shadow-md transform transition duration-200 hover:scale-110 focus:outline-none "
            type="text"
            onKeyDown={validateNumber}
            onChange={handleMoveNextInput}
          />
          <input
            maxLength="1"
            className="bg-gray-200 w-16 h-16 text-5xl text-center rounded-lg mx-3 shadow-md transform transition duration-200 hover:scale-110 focus:outline-none "
            type="text"
            onKeyDown={validateNumber}
            onChange={handleMoveNextInput}
          />
        </div>
        <button className="w-1/3 bg-slate-200  text-3xl p-5 m-5 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
          받기
        </button>
      </form>
    </div>
  );
}

export default Receiving;
