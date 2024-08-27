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

  const clearMessage = () => {
    setMessage("");
  };

  const validate = (order) => {
    function hasExtension(fileName) {
      return /\.[^/.]+$/.test(fileName);
    }
    if (!order.action) {
      return "행동을 선택해 주세요.";
    }

    if (!order.attachmentName) {
      return "대상 파일을 선택해 주세요.";
    }

    if (!order.executionPath) {
      return "명령을 수행할 최종 경로를 지정해주세요.";
    }

    if (order.action === "이동하기" && !order.sourcePath) {
      return "이동할 파일이 있는 경로를 지정해주세요.";
    }

    if (order.action === "수정하기") {
      if (!order.editingName) return "수정할 이름을 적어주세요.";

      if (!hasExtension(order.editingName))
        return "확장자 이름까지 적어주세요.";
    }
  };

  const handleInput = (event) => {
    updateOrder({ editingName: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const MAXIMUM_ORDER_NUMBER = 5;
    const isOverMaxOrders = orders.length >= MAXIMUM_ORDER_NUMBER;

    if (isOverMaxOrders) {
      setMessage(VALIDATION_MESSAGES.MAX_ORDER_LIMIT);
      return;
    }

    const validateResult = validate(currentOrder);
    if (validateResult) {
      setMessage(validateResult);
      return;
    }

    addOrder(currentOrder);

    setClientStatus({ isSubmitted: true });
    clearOrder();
  };

  return (
    <div className="container-small">
      <label className="label-large">제조하기</label>
      <form onSubmit={handleSubmit} onClick={clearMessage}>
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
