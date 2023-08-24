import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalConfig } from "@/store/interface";

const initialState: GlobalConfig = {
  collapsed: false,
  breadcrumb: false,
  menuItems: [],
};

const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  reducers: {
    setCollapsed(state, action: PayloadAction<Partial<GlobalConfig>>) {
      state.collapsed = action.payload.collapsed;
    },
    setBreadcrumb(state, action: PayloadAction<Partial<GlobalConfig>>) {
      state.breadcrumb = action.payload.breadcrumb;
    },
    setMenuItems(state, action: PayloadAction<Partial<GlobalConfig>>) {
      state.menuItems = action.payload.menuItems;
    },
  },
});

export const { setCollapsed, setBreadcrumb, setMenuItems } =
  globalConfigSlice.actions;

export default globalConfigSlice.reducer;
