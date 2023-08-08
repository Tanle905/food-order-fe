import { ATBranding } from "@/components/atoms/link/branding.atom";
import { Stack } from "@mui/material";

interface MCHeaderLeftProps {
  width: string;
}

export function MCHeaderLeft({ width }: MCHeaderLeftProps) {
  return (
    <Stack direction="row" alignItems="center" width={width}>
      <ATBranding />
    </Stack>
  );
}
