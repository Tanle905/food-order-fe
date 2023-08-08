"use client";
import { OGTable } from "@/components/organisms/data-displays/table.organism";
import { userManagementRoute } from "@/routes/user-management.route";

export default function Management() {
  return <OGTable route={userManagementRoute} />;
}
