import { ReactElement } from "react";

export interface SidebarMenuItem {
  icon: ReactElement;
  title: string;
  link?: string;
  children?: SidebarMenuItem[];
}
