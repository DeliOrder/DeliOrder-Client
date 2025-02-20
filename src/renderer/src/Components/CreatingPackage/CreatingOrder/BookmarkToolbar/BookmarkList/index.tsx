import usePackageStore from "@renderer/store";
import { ExtendedOrderType } from "..";
import { ReactNode } from "react";

interface BookmarkListProps {
  bookmarks: Array<ExtendedOrderType>;
  closeBookmarkList: () => void;
}

function BookmarkList({
  bookmarks,
  closeBookmarkList,
}: BookmarkListProps): ReactNode {
  const { updateOrder } = usePackageStore();

  const applyBookmark = (index: number): void => {
    const { _id, updatedAt, createdAt, ...essentialField } = bookmarks[index];

    void _id;
    void updatedAt;
    void createdAt;
    updateOrder(essentialField);
    closeBookmarkList();
  };

  return (
    <>
      {bookmarks.map((bookmark, index: number) => (
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
            {bookmark.executionPath}
            {bookmark.action === "이동하기" ? "(으)로 " : "에서 "}
          </span>
          {bookmark.editingName && (
            <span className="text-lg font-light">
              {`"${bookmark.editingName}"(으)로 `}
            </span>
          )}
          <span className="text-lg font-bold">{bookmark.action}</span>
        </button>
      ))}
    </>
  );
}

export default BookmarkList;
