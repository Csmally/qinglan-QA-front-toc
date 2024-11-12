import { LoginResDataType } from "@/types/fetchResponse";
import { create } from "zustand";

interface UserInfoStoreType {
  userInfo: LoginResDataType;
  setUserInfo: (userInfo: LoginResDataType) => void;
}

const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  userInfo: {
    id: -1,
    account: "",
    password: "",
    template: {
      id: -1,
      name: "",
      desc: "",
      groupOptions: []
    },
    name: "",
    sex: "-1",
    token: "",
    classBelong: {
      id: -1,
      class: "",
      classText: "",
      customerId: -1,
      grade: "",
      gradeText: "",
    },
    customerBelong: {
      id: -1,
      desc: "",
      name: "",
      templateId: -1,
    },
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfoStore;
