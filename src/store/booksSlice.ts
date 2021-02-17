import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./";

interface Options {
  page: number;
  itemsPerPage: number;
  searchTerm?: string;
}

interface Book {
  book_author: string[];
  book_publication_city: string;
  book_publication_country: string;
  book_publication_year: string;
  book_pages: 23;
  book_title: string;
  id: 1;
}

interface FetchResult {
  books: Book[];
  count: number;
}

interface BooksState {
  response: FetchResult | null;
  fetchState: "idle" | "pending" | "fulfilled" | "rejected";
  errorMessage: string;
}

const initialState: BooksState = {
  response: null,
  fetchState: "idle",
  errorMessage: "",
};

export const fetchBooks = createAsyncThunk(
  "Books/fetchBooks",
  async (options: Options, { rejectWithValue }) => {
    const { page, itemsPerPage, searchTerm = "" } = options;
    const values = searchTerm.trim().split(" ");

    const response = await fetch(
      // `http://nyx.vima.ekt.gr:3000/api/books?page=${page}&itemsPerPage=${itemsPerPage}`,
      `http://nyx.vima.ekt.gr:3000/api/books`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          page,
          itemsPerPage,
          filters: [{ type: "all", values }],
        }),
      }
    );
    if (!response.ok) {
      return rejectWithValue(`${response.status} (${response.statusText})`);
    } else {
      return await response.json();
    }
  }
);

/* export const fetchBooks = createAsyncThunk(
  "Books/fetchBooks",
  async (options: Options, { rejectWithValue }) => {
    const { page, itemsPerPage } = options;
    const response = await fetch(
      `https://60286889289eb50017cf6f55.mockapi.io/api/books?page=${page}&itemsPerPage=${itemsPerPage}`,
      { method: "GET" }
    );
    if (!response.ok) {
      return rejectWithValue(`${response.status} (${response.statusText})`);
    } else {
      return await response.json();
    }
  }
); */

const appSlice = createSlice({
  name: "Books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.fetchState = "fulfilled";
        state.response = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.fetchState = "rejected";
        state.errorMessage =
          (action.payload as string) ||
          action.error?.message ||
          "Unknown Error";
      })
      .addCase(fetchBooks.pending, (state, action) => {
        state.fetchState = "pending";
      });
  },
});

const { reducer } = appSlice;

// selectors
export const selectCount = (state: RootState) => state.books.response?.count;
export const selectBooks = (state: RootState) => state.books.response?.books;
export const selectBooksFetchState = (state: RootState) =>
  state.books.fetchState;
export const selectBooksFetchError = (state: RootState) =>
  state.books.errorMessage;

// reducer
export default reducer;
