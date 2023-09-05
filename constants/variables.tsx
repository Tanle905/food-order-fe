import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import TableViewIcon from "@mui/icons-material/TableView";
import { SCREENROUTE } from "./screen-routes";
import { SidebarMenuItem } from "@/interfaces/menu-item.interface";
import { ATHeaderItemProps } from "@/components/atoms/link/header-item.atom";

//Images
export const SPLASH_IMG = "/images/splash_img.jpg";
//Menu Items
export const headerItems: ATHeaderItemProps[] = [
  {
    title: "Food Order",
    link: SCREENROUTE.FOOD_ORDER,
  },
  // {
  //   title: "Management",
  //   link: SCREENROUTE.MANAGEMENT.BASE + SCREENROUTE.MANAGEMENT.TABLE,
  // },
];
export const sidebarMenuItems: SidebarMenuItem[] = [
  {
    icon: <DisplaySettingsIcon />,
    title: "Landing Page",
    link: SCREENROUTE.FOOD_ORDER,
  },
  {
    icon: <FormatAlignLeftIcon />,
    title: "Management",
    children: [
      {
        icon: <TableViewIcon />,
        title: "Table",
        link: SCREENROUTE.MANAGEMENT.BASE + SCREENROUTE.MANAGEMENT.TABLE,
      },
    ],
  },
];
// Order Variables
export const orderTypeOptions = [
  {
    label: "All",
    value: 0,
  },
  {
    label: "Foods",
    value: 1,
  },
  {
    label: "Drinks",
    value: 2,
  },
];
export const orderVisibilityOptions = [
  {
    label: "Public",
    value: 0,
  },
  {
    label: "Private",
    value: 1,
  },
];
