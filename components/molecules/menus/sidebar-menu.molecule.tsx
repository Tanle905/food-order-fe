import { sidebarMenuItems } from "@/constants/variables";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Stack,
  Toolbar,
  IconButton,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MCSidebarMenu(props: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleCloseDrawer() {
    setOpen(false);
  }

  function handleNavigate(link?: string) {
    if (!link) return;

    router.push(link);
  }
  return (
    <Drawer
      onClose={handleCloseDrawer}
      open={open}
      anchor="right"
      variant="persistent"
      className="bg-gray-900"
      PaperProps={{
        sx: {
          background: "#111827",
        },
      }}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Navigation</Typography>
        <IconButton onClick={handleCloseDrawer}>
          <GridCloseIcon />
        </IconButton>
      </Toolbar>
      <List>
        {sidebarMenuItems.map((item, index) => (
          <>
            <ListItemButton onClick={() => handleNavigate(item.link)}>
              <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
            {item.children && (
              <Collapse in={true} timeout="auto" unmountOnExit>
                {item.children.map((child, i) => (
                  <List>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            )}
          </>
        ))}
      </List>
    </Drawer>
  );
}
