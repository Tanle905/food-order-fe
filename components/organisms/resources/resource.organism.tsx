import { ResourceConfig } from "@/interfaces/route.interface";
import { OGTable } from "../data-displays/table.organism";
import { Paper } from "@mui/material";
import { useMemo } from "react";

export function OGResource<T>({
  resourceType,
  resourceProps,
}: ResourceConfig<T>) {
  switch (resourceType) {
    case "table":
      return (
        <Paper className="rounded-lg mx-16 p-5 shadow-md">
          <OGTable route={useMemo(() => resourceProps as any, [])} />
        </Paper>
      );
    default:
      return null;
  }
}
