import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeading, Panel, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { principals } from "@/lib/mock-data";

export const Route = createFileRoute("/super-admin/principals")({
  head: () => ({
    meta: [
      { title: "Principals · Vidyavarta Super Admin" },
      {
        name: "description",
        content: "Principal accounts across every onboarded school, with password reset actions.",
      },
      { property: "og:title", content: "Principals · Vidyavarta Super Admin" },
      { property: "og:description", content: "Manage principal logins across the network." },
    ],
  }),
  component: PrincipalsPage,
});

function PrincipalsPage() {
  const [query, setQuery] = useState("");
  const rows = principals.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.school.toLowerCase().includes(query.toLowerCase()) ||
      p.username.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading title="Principals" subtitle={`${principals.length} principal accounts`} />
      <Panel
        title="Principal Accounts"
        description="One admin login per school"
        toolbar={
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search principals…"
            className="h-9 w-44 rounded-2xl sm:w-56"
          />
        }
        footer={<span>Showing {rows.length} accounts</span>}
      >
        {rows.length === 0 ? (
          <EmptyState title="No principals found" hint="Try a different name or school." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Username</th>
                  <th className="px-4 py-3 font-medium">School</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((p) => (
                  <tr key={p.id} className="hover:bg-foreground/[0.02]">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="num px-4 py-3 text-muted-foreground">{p.username}</td>
                    <td className="px-4 py-3">{p.school}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.phone}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => toast.success(`Password reset link sent to ${p.name}`)}
                      >
                        Reset Password
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}
