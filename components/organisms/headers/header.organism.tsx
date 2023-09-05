import { MCHeaderLeft } from "@/components/molecules/headers/header-left.molecule copy";
import { MCHeaderRight } from "@/components/molecules/headers/header-right.molecule";
import { Stack } from "@mui/material";

export function OGHeader() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      height={75}
      className="bg-slate-900 shadow-lg px-10 mb-10"
    >
      <MCHeaderLeft width="50%" />
      <MCHeaderRight width="50%" />
    </Stack>
  );
}
