import usePackageStore from "../../../../store";
import PropTypes from "prop-types";

function Order({ order, index }) {
  const { deleteOrder } = usePackageStore();

  const {
    action,
    attachmentName,
    attachmentType,
    sourcePath,
    executionPath,
    editingName,
    useVscode,
  } = order;

  const handleDelete = () => {
    deleteOrder(index);
  };

  return (
    <div className="item-center container flex justify-items-start">
      <div className="flex items-center p-2">
        <div className="py-2 pr-4 text-2xl font-medium text-slate-500">
          {index + 1}
        </div>
      </div>
      <div className="mx-auto my-2 flex w-fit flex-row items-center justify-start justify-items-start space-x-4 rounded border border-solid border-gray-300 p-2">
        {sourcePath && attachmentType !== "folder" && (
          <div className="text-block-blue">{sourcePath} 의</div>
        )}
        <div className="text-block-blue">
          {attachmentType === "folder"
            ? sourcePath || executionPath
            : attachmentName}
          을(를)
        </div>
        {(sourcePath || attachmentType !== "folder") && (
          <div className="text-block-blue">{executionPath} 에</div>
        )}
        {(useVscode || editingName) && (
          <div className="text-block-blue">
            {useVscode ? "vscode" : editingName} 으로
          </div>
        )}
        <div className="text-block-blue">{action}</div>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-300 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={handleDelete}
        >
          X
        </button>
      </div>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Order;
