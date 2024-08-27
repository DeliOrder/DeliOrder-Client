import PropTypes from "prop-types";

import usePackageStore from "@renderer/store";

function BookmarkList({ bookmarks, closeBookmarkList }) {
  const { updateOrder } = usePackageStore();

  const applyBookmark = (index) => {
    delete bookmarks[index]._id;
    delete bookmarks[index].updatedAt;
    delete bookmarks[index].createdAt;

    updateOrder(bookmarks[index]);
    closeBookmarkList();
  };

  return (
    <>
      {bookmarks.map((bookmark, index) => (
        <button
          key={bookmark.createdAt}
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
