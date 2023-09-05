"use client";
import { OGTable } from "@/components/organisms/data-displays/table.organism";
import { availableOrderList } from "@/routes/available-order-list.route";

export default function Management() {
  return <OGTable route={availableOrderList} />;
}
