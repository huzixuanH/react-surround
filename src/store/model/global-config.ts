import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalConfig } from "@/store/interface";

const initialState: GlobalConfig = {
  collapsed: false,
};

const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  reducers: {
    setCollapsed(state, action: PayloadAction<Partial<GlobalConfig>>) {
      state.collapsed = action.payload.collapsed;
    },
  },
});

export const { setCollapsed } = globalConfigSlice.actions;

export default globalConfigSlice.reducer;
