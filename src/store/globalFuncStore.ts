import { create } from "zustand";

interface GlobalFuncStoreType {
  funcs: any;
  setGlobalFunc: (funcs: { [key: string]: any }) => void; // 类型化 setPathData
}

const useGlobalFuncStore = create<GlobalFuncStoreType>((set) => ({
  funcs: {},
  setGlobalFunc: (newFuncs) =>
    set((state) => ({
      funcs: {
        ...state.funcs,
        ...newFuncs,
      },
    })),
}));

export default useGlobalFuncStore;
