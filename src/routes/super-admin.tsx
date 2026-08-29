import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/super-admin" },
  { label: "Schools", to: "/super-admin/schools" },
  { label: "Add School", to: "/super-admin/schools/new" },
  { label: "Principals", to: "/super-admin/principals" },
  { label: "Settings", to: "/super-admin/settings" },
];

export const Route = createFileRoute("/super-admin")({
  component: SuperAdminLayout,
});

function SuperAdminLayout() {
  return (
    <AppShell nav={nav} role="super-admin" brandLabel="Platform Console">
      <Outlet />
    </AppShell>
  );
}
