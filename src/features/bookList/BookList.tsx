import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorToast, Loading, Paginator } from "../";
import {
  fetchBooks,
  selectBooks,
  selectBooksFetchState,
  selectBooksFetchError,
  selectParams,
} from "../../store";

export const BookList: FC = () => {
  const dispatch = useDispatch();
  const { page, itemsPerPage, searchTerm } = useSelector(selectParams);
  const fetchState = useSelector(selectBooksFetchState);
  const error = useSelector(selectBooksFetchError);
  const books = useSelector(selectBooks);

  useEffect(() => {
    if (page && itemsPerPage) {
      if (searchTerm) {
        dispatch(fetchBooks({ page, itemsPerPage, searchTerm }));
      } else {
        dispatch(fetchBooks({ page, itemsPerPage }));
      }
    }
  }, [page, itemsPerPage, searchTerm, dispatch]);

  if (!page) return null;

  if (fetchState === "rejected") return <ErrorToast message={error} />;

  if (fetchState === "pending") return <Loading />;

  if (books) {
    if (books.length === 0) return <ErrorToast message={"No Results"} />;
    else {
      return (
        <div>
          <ul>
            {books.map((book) => {
              const {
                id,
                book_author = ["unknown"],
                book_pages = "unknown",
                book_publication_city = "unknown",
                book_publication_country = "unknown",
                book_publication_year = "unknown",
                book_title = "unknown",
              } = book;
              return (
                <li key={id}>
                  <ul>
                    <li>Title: {book_title}</li>
                    <li>Author: {book_author && book_author.join(" ")}</li>
                    <li>Country: {book_publication_country}</li>
                    <li>City: {book_publication_city}</li>
                    <li>Year: {book_publication_year}</li>
                    <li>Pages: {book_pages}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
          <Paginator />
        </div>
      );
    }
  } else return null;
};
