import { GridColDef } from "@mui/x-data-grid";

export interface TableConfig {
  apiEndpoint?: string;
  data?: any;
  title?: string;
  subTitle?: string;
  filter?: FilterConfig[];
  search?: (value?: string) => {
    [key: string]: any;
  };
  extraRightComponent?: ((props: TableProps) => any)[];
  query?: {
    [key: string]: any;
  };
  table: {
    pageSize?: number[];
    columns: GridColDef[];
    transform?: (data: any) => any;
    redirect?: (data: any) => string;
  };
}

interface TableProps {
  key: any;
  href?: string | null;
}
export interface FilterConfig {
  key: string;
  label: string;
  endpoint?: string;
  data?: { value: string | null | undefined; label?: string }[];
}
