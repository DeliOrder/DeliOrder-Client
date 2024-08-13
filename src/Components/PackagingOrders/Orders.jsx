function Orders() {
  return (
    <div class="item-center container flex justify-items-start">
      <div class="flex items-center p-2">
        <div class="py-2 pr-4 text-2xl font-medium text-slate-500">{1}</div>
      </div>
      <div class="mx-auto my-2 flex w-fit flex-row items-center justify-start justify-items-start space-x-4 rounded border border-solid border-gray-300 p-2">
        <div class="min-h-10 min-w-8 rounded bg-sky-300 px-4 py-2 text-sm">
          {"fileName 을"}
        </div>
        <div class="min-h-10 min-w-8 rounded bg-sky-300 px-4 py-2 text-sm">
          {"directory 에"}
        </div>
        <div class="min-h-10 min-w-8 rounded bg-sky-300 px-4 py-2 text-sm">
          {"action 합니다"}
        </div>
        <button class="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-300 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          X
        </button>
      </div>
    </div>
  );
}

export default Orders;
