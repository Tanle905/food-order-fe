import { Stack, Typography } from "@mui/material";
import FastfoodIcon from '@mui/icons-material/Fastfood';
export function ATBranding() {
  return (
    <Stack className="text-white" direction="row" spacing={2} alignItems="center">
      <FastfoodIcon fontSize="large" />
      <Typography variant="h5">
        FOOD ORDER.
      </Typography>
    </Stack>
  );
}
