import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeading, Panel, StatCard, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { schools } from "@/lib/mock-data";

export const Route = createFileRoute("/super-admin/")({
  head: () => ({
    meta: [
      { title: "Super Admin Dashboard · Vidyavarta" },
      {
        name: "description",
        content: "Network overview of schools, principals and recent onboardings.",
      },
      { property: "og:title", content: "Super Admin Dashboard · Vidyavarta" },
      {
        property: "og:description",
        content: "Track schools, active status and principals across the network.",
      },
    ],
  }),
  component: SuperAdminDashboard,
});

function SuperAdminDashboard() {
  const active = schools.filter((s) => s.status === "Active").length;
  const recent = schools.slice(0, 4);

  return (
    <>
      <PageHeading
        title="Network overview"
        subtitle="Vidyavarta Platform Console · 5 onboarded schools"
        actions={
          <>
            <Button asChild className="rounded-2xl">
              <Link to="/super-admin/schools/new">Add School</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/super-admin/schools">View Schools</Link>
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4">
        <StatCard label="Total Schools" value={schools.length} hint="+2 this quarter" tone="sage" />
        <StatCard
          label="Active Schools"
          value={active}
          hint={`${Math.round((active / schools.length) * 100)}% of network`}
          tone="sage"
        />
        <StatCard label="Total Principals" value={schools.length} hint="1 pending approval" />
        <StatCard label="Recently Added" value={recent.length} hint="Last 30 days" tone="sky" />
      </section>

      <Panel
        title="Recently Added Schools"
        description="Latest onboardings across the network"
        toolbar={
          <Button asChild variant="ghost" size="sm" className="rounded-2xl text-primary">
            <Link to="/super-admin/schools">View all</Link>
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">School Name</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Principal</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recent.map((s) => (
                <tr key={s.id} className="hover:bg-foreground/[0.02]">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.code}</td>
                  <td className="px-4 py-3">{s.city}</td>
                  <td className="px-4 py-3">{s.principalName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.contact}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to="/super-admin/schools/$id"
                      params={{ id: s.id }}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-card p-5 ring-1 ring-border lg:col-span-2">
          <h2 className="text-base font-medium">Quick Actions</h2>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <QuickAction to="/super-admin/schools/new" title="Add School" hint="Onboard a new campus" />
            <QuickAction to="/super-admin/schools" title="View Schools" hint="Full directory" />
            <QuickAction to="/super-admin/principals" title="Principals" hint="Manage admin logins" />
            <QuickAction to="/super-admin/settings" title="Settings" hint="Platform configuration" />
          </div>
        </div>
        <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <h2 className="text-base font-medium">Status Split</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Across all onboarded schools</p>
          <div className="mt-4 space-y-3">
            {(["Active", "Pending", "Inactive"] as const).map((st) => {
              const count = schools.filter((s) => s.status === st).length;
              return (
                <div key={st}>
                  <div className="flex items-center justify-between text-xs">
                    <StatusBadge status={st} />
                    <span className="num font-medium">{count}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-foreground/8">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(count / schools.length) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function QuickAction({ to, title, hint }: { to: string; title: string; hint: string }) {
  return (
    <Link
      to={to}
      className="rounded-2xl bg-background px-4 py-3 ring-1 ring-border transition-colors hover:bg-foreground/5"
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
    </Link>
  );
}
