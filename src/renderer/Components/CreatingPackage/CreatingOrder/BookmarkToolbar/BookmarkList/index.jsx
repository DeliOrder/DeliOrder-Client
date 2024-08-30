import PropTypes from "prop-types";

import usePackageStore from "@renderer/store";

function BookmarkList({ bookmarks, closeBookmarkList }) {
  const { updateOrder } = usePackageStore();

  const applyBookmark = (index) => {
    const { _id, updateAt, createAt, ...essentialField } = bookmarks[index];

    updateOrder(essentialField);
    closeBookmarkList();
  };

  return (
    <>
      {bookmarks.map((bookmark, index) => (
        <button
          key={bookmark._id}
          className="button-gray-light block text-left"
          onClick={() => {
            applyBookmark(index);
          }}
        >
          <span className="mr-2 font-bold text-black">
            {index + 1}
            {". "}
          </span>
          <span className="text-lg font-light">
            {`"${bookmark.attachmentName}" 을(를) `}
          </span>
          {bookmark.sourcePath && (
            <span className="text-lg font-light">
              {bookmark.sourcePath}에서{" "}
            </span>
          )}
          <span className="text-lg font-light">
            {` "${bookmark.executionPath}" `}
            {bookmark.action === "이동하기" ? "(으)로 " : "에서 "}
          </span>
          {bookmark.editingName && (
            <span className="text-lg font-light">
              {bookmark.editingName} (으)로{" "}
            </span>
          )}
          <span className="text-lg font-bold">{bookmark.action}</span>
        </button>
      ))}
    </>
  );
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  closeBookmarkList: PropTypes.func.isRequired,
};

export default BookmarkList;
