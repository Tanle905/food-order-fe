import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";

export interface ATHeaderItemProps {
  title: string;
  link: string;
}

export function ATHeaderItem({ title, link }: ATHeaderItemProps) {
  const pathName = usePathname();
  const isActive = pathName === link;

  return (
    <Typography
      variant="subtitle1"
      className={`${isActive ? "underline underline-offset-4 text-blue-500" : "text-gray-300"} transition-all hover:text-blue-500`}
    >
      <Link href={link}>{title}</Link>
    </Typography>
  );
}
