import { USER_ENDPOINT } from "@/constants/endpoints";
import { TableConfig } from "@/interfaces/route.interface";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";

export const userManagementRoute: TableConfig = {
  apiEndpoint: USER_ENDPOINT.BASE,
  query: {
    seed: "abc",
  },
  search: (value) => ({
    name: value,
  }),
  table: {
    pageSize: [10, 25, 50, 100],
    columns: [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
        sortable: true,
      },
      {
        field: "avatar",
        headerName: "Avatar",
        flex: 0.3,
        renderCell: (params) => <Avatar src={params.value} />,
      },
      {
        field: "name",
        headerName: "Full Name",
        flex: 1,
      },
      {
        field: "gender",
        headerName: "Gender",
        flex: 0.6,
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "dob",
        headerName: "Date of Birth",
        flex: 1,
        valueFormatter: (params) =>
          dayjs(params.value.date).format("DD/MM/YYYY"),
      },
    ],
  },
};
