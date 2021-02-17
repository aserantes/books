import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./";

interface AppState {
  page: number | null;
  itemsPerPage: number | null;
  searchTerm?: string;
}

const initialState: AppState = {
  page: null,
  itemsPerPage: null,
  searchTerm: "",
};

const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<AppState>) => action.payload,
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;

// actions
export const { setPage, setItemsPerPage, setSearchTerm, setParams } = actions;

// selectors
export const selectParams = (state: RootState) => state.app;
export const selectPage = (state: RootState) => state.app.page;
export const selectitemsPerPage = (state: RootState) => state.app.itemsPerPage;
export const selectSearchTerm = (state: RootState) => state.app.searchTerm;

// reducer
export default reducer;
