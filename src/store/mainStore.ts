import create from "zustand";

// TODO REFACTOR THIS TYPES :///
interface MainStore {
  setMainAccount: (s: any) => void;
  mainAccount: {
    name: string;
    familyName: string;
    id: string;
    type: string;
    cardId: string;
    tel: string;
    block: boolean | 0 | 1;
    accessibility: string[];
  };
  listUserData: any[];
  setListUser(s: any): void;
  currentAccountDetail: any;
  setCurrentAccountDetail: any;
}

const mainStore = create<MainStore>()((set) => ({
  mainAccount: {
    name: "",
    familyName: "",
    id: "",
    type: "",
    cardId: "",
    tel: "",
    block: false,
    balance: "",
    accessibility: [],
  },
  setMainAccount: (data: any) => {
    set((s) => ({ ...s, mainAccount: { ...s.mainAccount, ...data } }));
  },

  listUserData: [],
  setListUser: (list: any[]) => {
    set((pre) => ({ ...pre, listUserData: list }));
  },

  currentAccountDetail: {},
  setCurrentAccountDetail: (detail: any) => {
    set((pre) => ({ ...pre, currentAccountDetail: detail }));
  },
}));

export default mainStore;
