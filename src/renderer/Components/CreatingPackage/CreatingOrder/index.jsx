import { useState } from "react";

import BookmarkToolbar from "./BookmarkToolbar";
import ActionPicker from "./ActionPicker";
import FilePicker from "./FilePicker";
import FolderPicker from "./FolderPicker";

import usePackageStore from "@renderer/store";
import { VALIDATION_MESSAGES } from "@renderer/constants/messages";

import "../../shared/style.css";

function CreatingOrder() {
  const {
    setClientStatus,
    updateOrder,
    getOrder,
    clearOrder,
    addOrder,
    orders,
  } = usePackageStore();
  const currentOrder = getOrder();
  const [message, setMessage] = useState("");

  const handleInput = (event) => {
    updateOrder({ editingName: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const MAXIMUM_ORDER_NUMBER = 5;
    const isOverMaxOrders = orders.length >= MAXIMUM_ORDER_NUMBER;

    setMessage(isOverMaxOrders ? VALIDATION_MESSAGES.MAX_ORDER_LIMIT : "");

    if (!isOverMaxOrders) {
      addOrder(currentOrder);
    }

    setClientStatus({ isSubmitted: true });
    clearOrder();
  };

  return (
    <div className="container-small">
      <label className="label-large">제조하기</label>
      <form onSubmit={handleSubmit}>
        <ActionPicker />
        <div className="mx-auto max-w-md">
          <FilePicker />
          {currentOrder.action === "이동하기" && (
            <FolderPicker isOptional={true} />
          )}
          <FolderPicker isOptional={false} />
          {currentOrder.action === "수정하기" && (
            <div className="my-3">
              <label className="label-small">편집할 이름 지정하기</label>
              <input
                type="text"
                className="input-text focus:shadow-outline"
                placeholder="변경할 파일명을 적어주세요."
                onChange={handleInput}
                value={currentOrder.editingName}
                required
              />
            </div>
          )}
        </div>
        <p className="text-xs-red">{message} </p>
        <button className="button-base-blue">조합하기</button>
      </form>
      <BookmarkToolbar />
    </div>
  );
}

export default CreatingOrder;
