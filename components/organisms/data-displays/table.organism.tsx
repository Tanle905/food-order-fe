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
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";

interface OGTableProps {
  route: TableConfig;
}
interface TablePaginationProps {
  pageSizeOptions: number[];
  rowCount: number;
}
interface TableQuery {
  [key: string]: any;
  page: number;
  pageSize: number;
  sort?: string;
  order?: "asc" | "desc";
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

    handleSetQuery({
      orderBy: sortData ? sortData.field : null,
      order: sortData ? sortData.sort : null,
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
      {route.search && !_.isEmpty(route.search()) && (
        <TextField
          size="small"
          className="w-1/4"
          variant="outlined"
          placeholder="Search"
          onChange={handleSearchDebounced}
        />
      )}
      <DataGrid
        pagination
        checkboxSelection
        disableRowSelectionOnClick
        rowCount={rowCount}
        sortModel={[
          {
            field: query.orderBy,
            sort: query.order,
          },
        ]}
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
