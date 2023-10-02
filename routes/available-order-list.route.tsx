import { MCAddNewOrderModal } from "@/components/molecules/modals/add-new-order-modal.molecule";
import { ORDER_ENDPOINT } from "@/constants/endpoints";
import {
  orderTypeOptions,
  orderVisibilityOptions,
} from "@/constants/variables";
import { TableConfig } from "@/interfaces/route.interface";
import { Avatar, Link } from "@mui/material";
import dayjs from "dayjs";

export const availableOrderList: TableConfig = {
  apiEndpoint: ORDER_ENDPOINT.BASE,
  title: "Available Order List",
  query: {
    seed: "abc",
  },
  extraRightComponent: [({ key }) => <MCAddNewOrderModal key={key} />],
  search: (value) => ({
    name: value,
  }),
  table: {
    pageSize: [10, 25, 50, 100],
    columns: [
      {
        field: "id",
        headerName: "ID",
        flex: 0.2,
        sortable: true,
      },
      {
        field: "orderName",
        headerName: "Order Name",
        flex: 1,
      },
      {
        field: "orderType",
        headerName: "Order Type",
        flex: 0.5,
        renderCell(params) {
          return orderTypeOptions.find((o) => o.value === params.value)?.label;
        },
      },
      {
        field: "orderVisibility",
        headerName: "Order Visibility",
        flex: 0.6,
        renderCell(params) {
          return orderVisibilityOptions.find((o) => o.value === params.value)
            ?.label;
        },
      },
      {
        field: "member",
        headerName: "Members",
        flex: 1,
      },
      {
        field: "orderLink",
        headerName: "Order Link",
        flex: 0.5,
        renderCell(params:any) {
          return <Link href={params.value}>Link</Link>;
        },
      },
    ],
  },
};

const userColumns = [
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
    valueFormatter: (params) => dayjs(params.value.date).format("DD/MM/YYYY"),
  },
];
