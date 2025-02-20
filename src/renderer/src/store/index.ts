import { create, StateCreator } from "zustand";

interface ClientStatusType {
  isLogin: boolean;
  isPickFile: boolean;
  isUsingFilePicker: boolean;
  result: [];
}

interface ClientStatusSlice {
  clientStatus: ClientStatusType;
  setClientStatus: (setValue: Partial<ClientStatusType>) => void;
  getClientStatus: () => ClientStatusType;
}

interface File extends Blob {
  name: string;
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface OrderType {
  action: string;
  attachmentFile?: File;
  attachmentName: string;
  attachmentType: string;
  attachmentUrl: string;
  sourcePath: string;
  executionPath: string;
  editingName: string;
  useVscode: boolean;
}

interface OrderSlice {
  order: OrderType;
  updateOrder: (setValue: Partial<OrderType>) => void;
  getOrder: () => OrderType;
  clearOrder: () => void;
}

interface OrdersSlice {
  orders: Array<OrderType>;
  addOrder: (addOrder: OrderType) => void;
  deleteOrder: (targetIndex: number) => void;
  getOrders: () => Array<OrderType>;
  clearOrders: () => void;
}

interface InfoModalType {
  message: string;
  isOpen: boolean;
}

interface InfoModalSlice {
  infoModal: InfoModalType;
  setInfoMessage: (setMessage: string) => void;
  openInfoModal: () => void;
  closeInfoModal: () => void;
}

type PackageStore = ClientStatusSlice &
  OrderSlice &
  OrdersSlice &
  InfoModalSlice;

const createClientStatusSlice: StateCreator<ClientStatusSlice> = (
  set,
  get,
) => ({
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

const createOrderSlice: StateCreator<OrderSlice> = (set, get) => ({
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

const createOrdersSlice: StateCreator<OrdersSlice> = (set, get) => ({
  orders: [],
  addOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })),
  deleteOrder: (targetIndex) =>
    set((state) => ({
      orders: state.orders.filter((_, index) => index !== targetIndex),
    })),
  getOrders: () => get().orders,
  clearOrders: () =>
    set(() => ({
      orders: [],
    })),
});

const infoModalSlice: StateCreator<InfoModalSlice> = (set) => ({
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

const usePackageStore = create<PackageStore>((set, get, store) => ({
  ...createClientStatusSlice(set, get, store),
  ...createOrderSlice(set, get, store),
  ...createOrdersSlice(set, get, store),
  ...infoModalSlice(set, get, store),
}));

export default usePackageStore;
