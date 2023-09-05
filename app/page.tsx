"use client";

import { OGResource } from "@/components/organisms/resources/resource.organism";
import { TableConfig } from "@/interfaces/route.interface";
import { availableOrderList } from "@/routes/available-order-list.route";

export default function Home() {
  return (
    <OGResource<TableConfig>
      resourceType="table"
      resourceProps={availableOrderList}
    />
  );
}
