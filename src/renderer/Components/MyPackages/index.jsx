import mockData from "./mockData.json";

function MyPackages() {
  // TODO: userDBAllData는 목데이터로 front 로직 구현시 데이터베이스에서 실제정보를 불러와주는 로직 필요
  const userDBAllData = mockData;
  const latestOrderUserHistory = userDBAllData.history.slice().reverse();
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 p-8">
      <div className="mt-6 w-full max-w-3xl space-y-6">
        {/* <div className="text-lg font-bold text-gray-700">▽ 과거행동순</div> */}
        {latestOrderUserHistory.map((userPackage, index) => (
          <div
            key={userPackage.serialNumber}
            className="rounded-lg border border-gray-300 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <span className="text-lg font-semibold text-blue-600">
                Package {index + 1}
              </span>
              <time className="text-sm text-gray-500">
                만료일시:{" "}
                {new Date(userPackage.expireAt.$date).toLocaleDateString()}{" "}
                {new Date(userPackage.expireAt.$date).toLocaleTimeString()} /{" "}
                <span
                  className={`font-bold ${
                    new Date(userPackage.expireAt.$date) > new Date()
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {new Date(userPackage.expireAt.$date) > new Date()
                    ? "전송가능"
                    : "만료됨"}
                </span>
              </time>
            </div>
            <div className="space-y-2">
              {userPackage.orders.map((order, orderIndex) => (
                <div key={order.createdAt} className="text-gray-700">
                  {orderIndex + 1}. {order.action}
                </div>
              ))}
            </div>
            <p className="mt-4 text-right text-sm text-gray-400">
              일련번호: {userPackage.serialNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPackages;
