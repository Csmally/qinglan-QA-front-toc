import { LoginResDataType } from "@/types/fetchResponse";
import { create } from "zustand";

interface UserInfoStoreType {
  userInfo: LoginResDataType;
  setUserInfo: (userInfo: LoginResDataType) => void;
}

const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  userInfo: {
    id: -1,
    token: "",
    name: "",
    sex: "0",
    account: "",
    password: "",
    classId: -1,
    template: {
      id: -1,
      name: "",
      desc: "",
      groupOptions: [],
    },
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfoStore;
