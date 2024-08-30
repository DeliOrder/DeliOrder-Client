import deliTruck from "@images/deliTruck.png";

function Introduction() {
  const features = [
    { icon: "📂", text: "파일 전송이 가능합니다" },
    { icon: "📂", text: "파일 이동이 가능합니다" },
    { icon: "📂", text: "파일 복제가 가능합니다" },
    { icon: "🗑️", text: "파일 삭제가 가능합니다" },
    { icon: "🚀", text: "파일 실행이 가능합니다" },
    { icon: "📦", text: "압축 해제가 가능합니다" },
  ];

  return (
    <div className="flex flex-1 items-center justify-center overflow-y-auto bg-white p-6">
      <div className="flex w-full max-w-7xl overflow-hidden rounded-3xl shadow-2xl">
        <div className="to-blue-medium flex flex-1 flex-col justify-between bg-gradient-to-br from-sky-500 p-12 text-white">
          <div>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight">
              파일 작업 <span className="text-yellow-bright">자동화</span>{" "}
              패키지
            </h1>
            <p className="mb-6 text-2xl font-light">
              원격 조종이나 복잡한 메뉴얼은 필요 없습니다.
            </p>
            <p className="mb-8 text-xl font-light">
              파일 작업 자동화 패키지를 만들고,
              <br /> 모든 사람과 쉽게 공유하고 실행하세요!
            </p>
          </div>
          <img
            src={deliTruck}
            className="mx-auto mb-8 mt-8 max-w-md"
            alt="Product Image"
          />
          <div className="flex justify-center space-x-4"></div>
        </div>
        <div className="flex flex-1 flex-col justify-center bg-gray-50 p-12">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">주요 기능</h2>
          <ul className="space-y-6">
            {features.map((item, index) => (
              <li
                key={index}
                className="flex items-center rounded-xl bg-white p-4 shadow-md transition duration-300 hover:shadow-lg"
              >
                <span className="mr-4 text-4xl">{item.icon}</span>
                <span className="text-2xl font-medium text-gray-700">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
