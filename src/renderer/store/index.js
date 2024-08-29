import { create } from "zustand";

const createClientStatusSlice = (set, get) => ({
  clientStatus: {
    isLogin: false,
    isPickFile: true,
    isUsingFilePicker: true,
    result: [],
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
  useVscode: false,
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

const infoModalSlice = (set) => ({
  infoModal: {
    message: "",
    isOpen: false,
  },
  setInfoMessage: (newMessage) =>
    set((state) => ({
      infoModal: { ...state.infoModal, message: newMessage },
    })),
  openInfoModal: () =>
    set((state) => ({
      infoModal: { ...state.infoModal, isOpen: true },
    })),
  closeInfoModal: () =>
    set(() => ({
      infoModal: { message: "", isOpen: false },
    })),
});

const usePackageStore = create((set, get) => ({
  ...createClientStatusSlice(set, get),
  ...createOrderSlice(set, get),
  ...createOrdersSlice(set, get),
  ...infoModalSlice(set, get),
}));

export default usePackageStore;
