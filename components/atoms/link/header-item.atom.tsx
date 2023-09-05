import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";

export interface ATHeaderItemProps {
  title: string;
  link: string;
}

export function ATHeaderItem({ title, link }: ATHeaderItemProps) {
  const pathName = usePathname();
  const isActive = pathName === link;

  return (
    <Button variant={isActive ? "contained" : "outlined"}>
      <Link href={link}>{title}</Link>
    </Button>
  );
}
