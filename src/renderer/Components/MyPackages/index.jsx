import { useState } from "react";

import mockData from "./mockData.json";
import triangleArrowDown from "@images/triangleArrowDown.svg";

function MyPackages() {
  // TODO: userDBAllData는 목데이터로 front 로직 구현시 데이터베이스에서 실제정보를 불러와주는 로직 필요
  const userDBAllData = mockData;
  const [currentSort, setCurrentSort] = useState("sortByNewest");
  const [userHistorySort, setUserHistorySort] = useState(
    userDBAllData.history.slice().reverse(),
  );

  const toggleSort = () => {
    if (currentSort === "sortByNewest") {
      setCurrentSort("sortByOldest");
      setUserHistorySort(userDBAllData.history);
    } else {
      setCurrentSort("sortByNewest");
      setUserHistorySort(userDBAllData.history.slice().reverse());
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 p-8">
      <div className="mt-6 w-full max-w-3xl space-y-6">
        <div
          className="flex cursor-pointer flex-row items-center text-lg font-bold text-gray-700"
          onClick={toggleSort}
        >
          <img
            className="mr-1 h-4 w-4"
            src={triangleArrowDown}
            alt="triangleArrowDown"
          />
          {currentSort === "sortByNewest"
            ? "최신패키지 순 정렬"
            : "과거패키지 순 정렬"}
        </div>
        {userHistorySort.map((userPackage, index) => (
          <div
            key={userPackage.serialNumber}
            className="rounded-lg border border-gray-300 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <span className="text-lg font-semibold text-blue-600">
                Package {index + 1}
              </span>
              <time className="text-sm text-gray-500">
                {"만료일시: "}
                {new Date(userPackage.expireAt.$date).toLocaleString() + " / "}
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
                <div key={order.createdAt.$date} className="text-gray-700">
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
