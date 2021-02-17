import React, { FC } from "react";
import { useSelector } from "react-redux";
import { PaginatorButton } from "./PaginatorButton";
import {
  selectCount,
  selectitemsPerPage,
  selectPage,
  selectBooks,
  selectBooksFetchState,
} from "../../store";
import { makePaginatorButtons } from "../../utils";

export const Paginator: FC = () => {
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);
  const itemsPerPage = useSelector(selectitemsPerPage);
  const count = useSelector(selectCount);
  const fetchState = useSelector(selectBooksFetchState);

  console.log(books);

  if (
    !itemsPerPage ||
    !count ||
    !page ||
    fetchState !== "fulfilled" ||
    books?.length === 0
  )
    return null;

  const buttons = makePaginatorButtons(page, itemsPerPage, count);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {buttons.map((button, index) => (
        <PaginatorButton
          key={index}
          value={button.value}
          target={button.target}
          disabled={button.disabled}
          page={page}
        ></PaginatorButton>
      ))}
    </div>
  );
};
