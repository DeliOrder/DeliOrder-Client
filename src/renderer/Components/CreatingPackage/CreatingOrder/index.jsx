import { useState } from "react";
import BookmarkToolbar from "./BookmarkToolbar";
import FilePicker from "../../shared/FilePicker";
import FolderPicker from "../../shared/FolderPicker";
import "../../shared/style.css";

function CreatingOrder() {
  const [selectedAction, setSelectedAction] = useState("");

  const handleChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container-small">
      <label className="label-large">제조하기</label>
      <form onSubmit={handleSubmit}>
        <label className="label-small">행동 선택하기</label>
        <select
          name="action"
          className="input-base focus:shadow-outline"
          value={selectedAction}
          onChange={handleChange}
        >
          <option value="">행동을 선택해주세요.</option>
          <option>생성하기</option>
          <option>이동하기</option>
          <option>삭제하기</option>
          <option>실행하기</option>
          <option>수정하기</option>
        </select>
        <div className="mx-auto max-w-md">
          <FilePicker />
          <FolderPicker />
        </div>
        <button className="button-base-blue">조합하기</button>
        <BookmarkToolbar />
      </form>
    </div>
  );
}

export default CreatingOrder;
