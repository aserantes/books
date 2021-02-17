interface URLParams {
  page?: string;
  itemsPerPage?: string;
}

export interface Params {
  page: number;
  itemsPerPage: number;
  searchTerm: string;
}

export function validateUrlParams(params: URLParams): Params {
  const { page, itemsPerPage } = params;
  const parsedPage = page && parseInt(page);
  const parseditemsPerPage = itemsPerPage && parseInt(itemsPerPage);

  const pageParam = parsedPage && parsedPage > 0 && parsedPage;
  const itemsPerPageParam =
    parseditemsPerPage && parseditemsPerPage > 0 && parseditemsPerPage;

  return {
    page: pageParam || 1,
    itemsPerPage: itemsPerPageParam || 20,
    searchTerm: "",
  };
}

interface Button {
  value: string;
  target: number;
  disabled: boolean;
}

export function makePaginatorButtons(
  page: number,
  itemsPerPage: number,
  count: number
): Button[] {
  const lastPage = Math.ceil(count / itemsPerPage);

  if (lastPage < 8) {
    let arr = [];
    arr = [...Array(lastPage)].map((_, i) => ({
      value: (i + 1).toString(),
      target: i + 1,
      disabled: false,
    }));
    return arr;
  }

  let arr = Array(10);

  arr[0] = { value: "First", target: 1, disabled: false };
  arr[1] = {
    value: "Prev",
    target: page >= 1 && page <= lastPage ? page - 1 : 1,
    disabled: page === 1,
  };
  arr[9] = {
    value: "Next",
    target: page >= 1 && page <= lastPage ? page + 1 : 2,
    disabled: page === lastPage,
  };
  arr[10] = { value: "Last", target: lastPage, disabled: false };

  if (page < 4 || page < 1 || page > lastPage) {
    arr[2] = { value: 1, target: 1, disabled: false };
    arr[3] = { value: 2, target: 2, disabled: false };
    arr[4] = { value: 3, target: 3, disabled: false };
    arr[5] = { value: 4, target: 4, disabled: false };
    arr[6] = { value: 5, target: 5, disabled: false };
    arr[7] = { value: 6, target: 6, disabled: false };
    arr[8] = { value: "...", target: 0, disabled: true };
  } else if (page > lastPage - 3) {
    arr[2] = { value: "...", target: 0, disabled: true };
    arr[3] = { value: lastPage - 5, target: lastPage - 5, disabled: false };
    arr[4] = { value: lastPage - 4, target: lastPage - 4, disabled: false };
    arr[5] = { value: lastPage - 3, target: lastPage - 3, disabled: false };
    arr[6] = { value: lastPage - 2, target: lastPage - 2, disabled: false };
    arr[7] = { value: lastPage - 1, target: lastPage - 1, disabled: false };
    arr[8] = { value: lastPage, target: lastPage, disabled: false };
  } else if (page >= 3 && page <= lastPage - 3) {
    arr[2] = { value: "...", target: 0, disabled: true };
    arr[3] = { value: page - 2, target: page - 2, disabled: false };
    arr[4] = { value: page - 1, target: page - 1, disabled: false };
    arr[5] = { value: page, target: page, disabled: false };
    arr[6] = { value: page + 1, target: page + 1, disabled: false };
    arr[7] = { value: page + 2, target: page + 2, disabled: false };
    arr[8] = { value: "...", target: 0, disabled: true };
  }

  return arr;
}
