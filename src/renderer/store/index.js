import { create } from "zustand";

const createClientStatusSlice = (set, get) => ({
  clientStatus: {
    isSubmitted: false,
    isLogin: false,
  },
  setClientStatus: (setValue) =>
    set((state) => ({
      clientStatus: { ...state.clientStatus, ...setValue },
    })),
  getClientStatus: () => get().clientStatus,
});

const initialOrder = {
  action: "",
  attachmentName: "",
  attachmentType: "",
  attachmentUrl: "",
  sourcePath: "",
  executionPath: "",
  editingName: "",
};

const createOrderSlice = (set, get) => ({
  order: initialOrder,
  updateOrder: (setValue) =>
    set((state) => ({
      order: { ...state.order, ...setValue },
    })),
  getOrder: () => get().order,
  clearOrder: () =>
    set(() => ({
      order: { ...initialOrder },
    })),
});

const createOrdersSlice = (set, get) => ({
  orders: [],
  addOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })),
  deleteOrder: (targetIndex) =>
    set((state) => ({
      orders: state.orders.filter((value, index) => index !== targetIndex),
    })),
  getOrders: () => get().orders,
  clearOrders: () =>
    set(() => ({
      orders: [],
    })),
});

const usePackageStore = create((set, get) => ({
  ...createClientStatusSlice(set, get),
  ...createOrderSlice(set, get),
  ...createOrdersSlice(set, get),
}));

export default usePackageStore;
