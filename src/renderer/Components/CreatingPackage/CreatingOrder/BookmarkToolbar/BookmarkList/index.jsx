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
          className="button-base-blue"
          onClick={() => {
            applyBookmark(index);
          }}
        >
          {bookmark.action}
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
