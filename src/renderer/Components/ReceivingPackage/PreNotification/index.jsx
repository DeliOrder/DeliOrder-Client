import PropTypes from "prop-types";

import { GUIDE_MESSAGES } from "../../../constants/messages";

function PreNotification({ orders }) {
  const startIndex = 0;
  const endIndex = orders.length - 1;

  const startPath = orders[startIndex].executionPath;
  const endPath = orders[endIndex].executionPath;

  const overview = orders.map((order, index) => {
    const indexNumber = index + 1;

    if (order.action === "수정하기") {
      return `${indexNumber}. ${order.attachmentName} 을(를) ${order.editingName}로 ${order.action}`;
    } else {
      return `${indexNumber}. ${order.attachmentName} 을(를) ${order.action}`;
    }
  });

  return (
    <div className="grid justify-items-start">
      <p className="mt-1 text-xs">시작경로 : {startPath}</p>
      <p className="mt-1 text-xs">종료경로 : {endPath}</p>
      <p className="mt-3 text-xs">진행내용 : </p>
      {overview.map((order) => (
        <p key={order} className="mt-2 text-xs">
          {order}
        </p>
      ))}
      <p className="mt-5 justify-self-center text-sm font-bold text-red-400">
        {GUIDE_MESSAGES.CONFIRMATION}
      </p>
    </div>
  );
}

PreNotification.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default PreNotification;
