import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "./model/global-config";

export const store = configureStore({
  reducer: {
    globalConfig: globalConfigReducer,
    // 其他Reducer,...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** 订阅 store */
store.subscribe(() => console.log("store.getState()", store.getState()));
