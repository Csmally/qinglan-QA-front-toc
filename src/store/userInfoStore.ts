import { LoginResDataType } from "@/types/fetchResponse";
import { create } from "zustand";

interface UserInfoStoreType {
    userInfo: LoginResDataType;
    setUserInfo: (userInfo: LoginResDataType) => void;
}

const useUserInfoStore = create<UserInfoStoreType>((set) => ({
    userInfo: {
        token: "",
        name: "未知",
        mobile: "未知",
        sex: "1",
        age: 0,
        account: "",
        password: ""
    },
    setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfoStore;
