import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import triangleArrowDown from "@images/triangleArrowDown.svg";
import axios from "axios";
import refreshToken from "../../utils/refreshToken";

function MyPackages() {
  const [userHistoryData, setUserHistoryData] = useState([]);
  const [currentSort, setCurrentSort] = useState("sortByNewest");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserHistoryData = async () => {
      const userId = window.localStorage.getItem("deliOrderUserId");
      const deliOrderToken = window.localStorage.getItem("deliOrderToken");
      const authorization = "Bearer " + deliOrderToken;

      try {
        const {
          data: { history },
        } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}/history`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(deliOrderToken && { authorization }),
            },
          },
        );

        setUserHistoryData(
          history.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
          ),
        );
      } catch (error) {
        if (error.response.data.error === "Unauthorized") {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }

        if (error.response.data.error === "Token expired") {
          refreshToken();
          getUserHistoryData();
        }
        console.error("유저정보를 불러오는 중 오류가 발생하였습니다.", error);
      }
    };

    getUserHistoryData();
  }, [navigate]);

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
    <div className="flex min-h-screen items-start justify-center bg-blue-100 bg-gradient-to-r p-8">
      <div className="mt-6 w-full max-w-3xl space-y-8">
        <div
          className="flex cursor-pointer flex-row items-center text-lg font-bold text-blue-700 hover:text-blue-900"
          onClick={toggleSort}
        >
          <img
            className={`mr-2 h-5 w-5 ${
              currentSort === "sortByNewest" ? "" : "rotate-180"
            }`}
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
            className="bg- rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <span className="text-xl font-semibold text-blue-800">
                패키지 {index + 1}
              </span>
              <time className="text-right text-sm text-gray-600">
                <p>
                  만료일시: {new Date(userPackage.expireAt).toLocaleString()}{" "}
                </p>
                <span
                  className={`text-right font-bold ${
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
                  <span className="button-blue-round text-white">
                    {`${orderIndex + 1}`}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    {`"${order.attachmentName}" 을 "${order.executionPath}" 에서`}
                  </span>
                  {order.editingName && (
                    <span className="text-gray-600">
                      {` "${order.editingName}" 로`}
                    </span>
                  )}
                  {order.sourcePath && (
                    <span className="text-gray-600">
                      {` "${order.sourcePath}" 로`}
                    </span>
                  )}
                  <span className="font-bold text-blue-700">
                    {` ${order.action}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col justify-between text-left">
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-bold">링크: </span>
                <span
                  className="cursor-pointer hover:font-bold"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `electron-deliorder://open?packageId=${userPackage.serialNumber}`,
                    );
                  }}
                >
                  {`electron-deliorder://open?packageId=${userPackage.serialNumber}`}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">일련번호: </span>
                <span
                  className="cursor-pointer hover:font-bold"
                  onClick={() =>
                    navigator.clipboard.writeText(userPackage.serialNumber)
                  }
                >
                  {userPackage.serialNumber}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPackages;
