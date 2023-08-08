"use client";
import { MCSidebarMenu } from "@/components/molecules/menus/sidebar-menu.molecule";
import { Box } from "@mui/material";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <MCSidebarMenu />
      {children}
    </Box>
  );
}
