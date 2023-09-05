import { baseUrl } from "@/constants/endpoints";
import { TableConfig } from "@/interfaces/route.interface";
import { convertQueryParams } from "@/utils/data-transform";
import {
  FormControl,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridPaginationModel,
  GridSortModel,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import axios from "axios";
import _ from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

interface OGTableProps {
  route: TableConfig;
}
interface TablePaginationProps {
  pageSizeOptions: number[];
  rowCount: number;
}
interface TableQuery {
  page: number;
  pageSize: number;
  order?: "asc" | "desc";
  orderBy?: string;
}

const defaultPageSize = 25;
const defaultTotalRows = 100;

function TablePagination({ pageSizeOptions, rowCount }: TablePaginationProps) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  function handlePageChange(event: ChangeEvent<unknown>, page: number) {
    apiRef.current.setPage(page - 1);
  }

  function handlePageSizeChange(event: SelectChangeEvent) {
    apiRef.current.setPageSize(parseInt(event.target.value));
  }

  return (
    <Stack direction="row" alignItems="center">
      <FormControl variant="outlined">
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography>Rows per page:</Typography>
          <Select
            sx={{
              height: 30,
            }}
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
          >
            {pageSizeOptions.map((i, index) => (
              <MenuItem key={index} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </FormControl>
      <Pagination
        count={Math.floor(rowCount / pageSize)}
        page={page + 1}
        onChange={handlePageChange}
      />
    </Stack>
  );
}

export function OGTable({ route }: OGTableProps) {
  const [query, setQuery] = useState<TableQuery>({
    ...route.query,
    page: 1,
    pageSize: Array.isArray(route.table.pageSize)
      ? route.table.pageSize[0]
      : defaultPageSize,
  });
  const [rowCount, setRowCount] = useState(defaultTotalRows);
  const { data, isValidating, mutate } = useSWR(route.apiEndpoint, fetcher);

  const handleSearchDebounced = _.debounce((event: any) => {
    if (!route.search || !route.search(event.target.value)) return;

    handleSetQuery(route.search(event.target.value));
  }, 500);

  useEffect(() => {
    mutate();
  }, [query]);

  useEffect(() => {
    setRowCount((prevRowCount) =>
      rowCount !== undefined ? rowCount : prevRowCount
    );
  }, [rowCount, setRowCount]);

  async function fetcher(url: string) {
    return (
      //api dont have pageSize, only limit
      (
        await axios.get(
          baseUrl + url + convertQueryParams(query).replace("pageSize", "limit")
        )
      ).data
    );
  }

  function handleSetQuery(newValue: {}) {
    setQuery((prevQuery: any) => ({
      ...prevQuery,
      ...newValue,
    }));
  }

  function handleSort(model: GridSortModel) {
    const sortData = model[0];

    if (query.orderBy === sortData?.field && query.order === sortData?.sort)
      return;

    handleSetQuery({
      orderBy: sortData?.field,
      order: sortData?.sort,
    });
  }

  function handlePagination(model: GridPaginationModel) {
    const page = model.page + 1;

    handleSetQuery({
      page,
      pageSize: model.pageSize ?? defaultPageSize,
    });
  }

  return (
    <Stack gap={2} height={630}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack gap={2}>
          <Stack gap={2} direction="row" alignItems="center">
            {route.title && (
              <Typography variant="h6" className="min-w-fit">
                {route.title}
              </Typography>
            )}
            {route.search && !_.isEmpty(route.search()) && (
              <TextField
                size="small"
                className="w-6/12"
                variant="outlined"
                placeholder="Search"
                onChange={handleSearchDebounced}
              />
            )}
          </Stack>
          {route.subTitle && (
            <Typography variant="subtitle1">{route.subTitle}</Typography>
          )}
        </Stack>
        {route.extraRightComponent &&
          route.extraRightComponent.map((c, i) => c({ key: i, href: "sdf" }))}
      </Stack>
      <DataGrid
        pagination
        checkboxSelection
        disableRowSelectionOnClick
        rowCount={rowCount}
        sortModel={useMemo(
          () => [
            {
              field: query.orderBy ?? "",
              sort: query.order,
            },
          ],
          [query]
        )}
        onSortModelChange={handleSort}
        sortingMode="server"
        paginationMode="server"
        paginationModel={{
          page: query.page - 1,
          pageSize: query.pageSize,
        }}
        onPaginationModelChange={handlePagination}
        slots={{
          pagination: () => (
            <TablePagination
              rowCount={rowCount}
              pageSizeOptions={route.table.pageSize ?? [defaultPageSize]}
            />
          ),
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: query.pageSize,
            },
          },
        }}
        loading={isValidating || !data}
        columns={route.table.columns}
        rows={data ?? []}
      />
    </Stack>
  );
}
