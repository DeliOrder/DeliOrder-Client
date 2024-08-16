import usePackageStore from "../../../../store";

function ActionPicker() {
  const { updateOrder, getOrder } = usePackageStore();
  const currentOrder = getOrder();

  const handleActionChange = (event) => {
    updateOrder({ action: event.target.value });
  };

  return (
    <>
      <label className="label-small">행동 선택하기</label>
      <select
        name="action"
        className="input-base focus:shadow-outline"
        value={currentOrder.action}
        onChange={handleActionChange}
      >
        <option value="">행동을 선택해주세요.</option>
        <option>생성하기</option>
        <option>이동하기</option>
        <option>복제하기</option>
        <option>수정하기</option>
        <option>실행하기</option>
        <option>삭제하기</option>
      </select>
    </>
  );
}

export default ActionPicker;