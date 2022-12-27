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
    block: boolean;
    accessibility: string[];
  };
  listUserData: any[];
  setListUser(s: any): void;
  currentAccountDetail: any;
  setCurrentAccountDetail: any;
}

const mainStore = create<MainStore>()((set) => ({
  mainAccount: {
    name: "siavash",
    familyName: "mohebbi",
    id: "#1",
    type: "manager",
    cardId: "23123214",
    tel: "0002313",
    block: false,
    balance: "100$",
    accessibility: [
      "Add Customer",
      "Block Customer",
      "Make Transaction",
      "Add Employee",
      "Change Accessibility",
      "Add Manager",
      "Block Manager",
      "Block Employee",
      "Delete Employee",
    ],
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
