import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export {
  setParams,
  setPage,
  setItemsPerPage,
  setSearchTerm,
  selectParams,
  selectPage,
  selectitemsPerPage,
  selectSearchTerm,
} from "./appSlice";

export {
  selectCount,
  selectBooks,
  selectBooksFetchState,
  selectBooksFetchError,
  fetchBooks,
} from "./booksSlice";
