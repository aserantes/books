import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectParams, setPage } from "../../store";
import Button from "@material-ui/core/Button";

interface PaginatorButtonProps {
  value: string;
  target: number;
  disabled: boolean;
  page: number;
}

export const PaginatorButton: FC<PaginatorButtonProps> = ({
  value,
  target,
  disabled,
  page,
}) => {
  const dispatch = useDispatch();
  const { itemsPerPage } = useSelector(selectParams);
  const url = `/?page=${target ? target : page}&itemsPerPage=${itemsPerPage}`;
  const color = page === parseInt(value) ? "primary" : "default";
  return (
    <Link
      to={url}
      style={{
        textDecoration: "inherit",
      }}
    >
      <Button
        color={color}
        disabled={disabled}
        variant="contained"
        onClick={() => dispatch(setPage(target))}
      >
        {value}
      </Button>
    </Link>
  );
};
