import {
  ATHeaderItem,
  ATHeaderItemProps,
} from "@/components/atoms/link/header-item.atom";
import { SCREENROUTE } from "@/constants/screen-routes";
import { headerItems } from "@/constants/variables";
import { Stack, Button } from "@mui/material";
import { usePathname } from "next/navigation";

interface MCHeaderRightProps {
  width: string;
  hideNavigation?: string[];
}

export function MCHeaderRight({ width, hideNavigation }: MCHeaderRightProps) {
  const pathName = usePathname();
  return (
    <Stack
      direction="row"
      justifyContent="end"
      alignItems="center"
      width={width}
      className="space-x-10"
    >
      {!hideNavigation?.find((i) => pathName.indexOf(i) !== -1) &&
        headerItems.map(({ link, title }, index) => (
          <ATHeaderItem key={index} link={link} title={title} />
        ))}
    </Stack>
  );
}
