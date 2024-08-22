import { useEffect, useState } from "react";

import triangleArrowDown from "@images/triangleArrowDown.svg";
import axios from "axios";

function MyPackages() {
  const [userHistoryData, setUserHistoryData] = useState([]);
  const [currentSort, setCurrentSort] = useState("sortByNewest");

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const getUserHistoryData = async () => {
      const {
        data: { history },
      } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/history`,
      );

      setUserHistoryData(
        history.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
        ),
      );
    };

    getUserHistoryData();
  }, []);

  const toggleSort = () => {
    let sortedUserHistory;

    if (currentSort === "sortByNewest") {
      setCurrentSort("sortByOldest");

      sortedUserHistory = userHistoryData.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
      );
    } else {
      setCurrentSort("sortByNewest");

      sortedUserHistory = userHistoryData.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    }

    setUserHistoryData(sortedUserHistory);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <div className="mt-6 w-full max-w-3xl space-y-8">
        <div
          className="flex cursor-pointer flex-row items-center text-lg font-bold text-blue-700 hover:text-blue-900"
          onClick={toggleSort}
        >
          <img
            className="mr-2 h-5 w-5 transform transition-transform duration-300"
            src={triangleArrowDown}
            alt="Sort Icon"
          />
          {currentSort === "sortByNewest"
            ? "최신 패키지 순 정렬"
            : "과거 패키지 순 정렬"}
        </div>
        {userHistoryData.map((userPackage, index) => (
          <div
            key={userPackage.serialNumber}
            className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <span className="text-xl font-semibold text-blue-800">
                패키지 {index + 1}
              </span>
              <time className="text-sm text-gray-600">
                {"만료일시: "}
                {new Date(userPackage.expireAt).toLocaleString()} {" / "}
                <span
                  className={`font-bold ${
                    Date.parse(userPackage.expireAt) > Date.parse(new Date())
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {Date.parse(userPackage.expireAt) > Date.parse(new Date())
                    ? "전송 가능"
                    : "만료됨"}
                </span>
              </time>
            </div>
            <div className="space-y-4">
              {userPackage.orders.map((order, orderIndex) => (
                <div key={order._id} className="text-gray-700">
                  <span className="font-medium text-blue-700">
                    {`${orderIndex + 1}. ${order.action}`}
                  </span>
                  <span className="text-gray-600">
                    : "{order.attachmentName}" 을 "{order.executionPath}" 에서
                  </span>
                  {order.editingName && (
                    <span className="text-gray-600">
                      {" "}
                      "{order.editingName}" 로
                    </span>
                  )}
                  {order.sourcePath && (
                    <span className="text-gray-600">
                      {" "}
                      "{order.sourcePath}" 로
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-right">
              <a href="#" className="">
                링크: 추후에 클릭해서 해당 패키지 내용을 자동적으로 불러오기
                기능
              </a>
              <p className="text-sm text-gray-400">
                일련번호: {userPackage.serialNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPackages;
