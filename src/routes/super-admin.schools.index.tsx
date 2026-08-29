import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeading, Panel, StatusBadge } from "@/components/app-shell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schools as seed, type School, type Status } from "@/lib/mock-data";

export const Route = createFileRoute("/super-admin/schools/")({
  head: () => ({
    meta: [
      { title: "Schools Directory · Vidyavarta Super Admin" },
      {
        name: "description",
        content: "Search, filter and manage every school onboarded to the fee management platform.",
      },
      { property: "og:title", content: "Schools Directory · Vidyavarta Super Admin" },
      { property: "og:description", content: "Directory of onboarded schools with status controls." },
    ],
  }),
  component: SchoolsPage,
});

const PAGE_SIZE = 4;

function SchoolsPage() {
  const [rows, setRows] = useState<School[]>(seed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | Status>("all");
  const [page, setPage] = useState(1);
  const [pendingToggle, setPendingToggle] = useState<School | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter((s) => {
        const q = query.trim().toLowerCase();
        const matches =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.principalName.toLowerCase().includes(q);
        return matches && (status === "all" || s.status === status);
      }),
    [rows, query, status],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const confirmToggle = () => {
    if (!pendingToggle) return;
    const next: Status = pendingToggle.status === "Active" ? "Inactive" : "Active";
    setRows((prev) =>
      prev.map((s) => (s.id === pendingToggle.id ? { ...s, status: next } : s)),
    );
    toast.success(`${pendingToggle.name} marked ${next.toLowerCase()}`);
    setPendingToggle(null);
  };

  return (
    <>
      <PageHeading
        title="Schools"
        subtitle={`${filtered.length} of ${rows.length} schools shown`}
        actions={
          <Button asChild className="rounded-2xl">
            <Link to="/super-admin/schools/new">Add School</Link>
          </Button>
        }
      />

      <Panel
        title="School Directory"
        description="Search by name, code, city or principal"
        toolbar={
          <>
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search schools…"
              className="h-9 w-44 rounded-2xl sm:w-56"
            />
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v as "all" | Status);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 w-36 rounded-2xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
        footer={
          <>
            <span>
              Showing {visible.length} of {filtered.length} schools
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(1, current - 1))}
                className="grid size-8 place-items-center rounded-xl ring-1 ring-border hover:bg-foreground/5"
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={
                    i + 1 === current
                      ? "grid size-8 place-items-center rounded-xl bg-primary/10 font-medium text-primary"
                      : "grid size-8 place-items-center rounded-xl ring-1 ring-border hover:bg-foreground/5"
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(pages, current + 1))}
                className="grid size-8 place-items-center rounded-xl ring-1 ring-border hover:bg-foreground/5"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </>
        }
      >
        {visible.length === 0 ? (
          <EmptyState title="No schools match your filters" hint="Try clearing the search or status filter." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">School Name</th>
                  <th className="px-4 py-3 font-medium">Code</th>
                  <th className="px-4 py-3 font-medium">Address / City</th>
                  <th className="px-4 py-3 font-medium">Principal</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map((s) => (
                  <tr key={s.id} className="hover:bg-foreground/[0.02]">
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.code}</td>
                    <td className="px-4 py-3">
                      {s.address}, {s.city}
                    </td>
                    <td className="px-4 py-3">{s.principalName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.contact}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Button asChild size="sm" variant="ghost" className="rounded-xl">
                          <Link to="/super-admin/schools/$id" params={{ id: s.id }}>
                            View
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-xl"
                          onClick={() => toast.info(`Edit form for ${s.name} (prototype)`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => setPendingToggle(s)}
                        >
                          {s.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <AlertDialog open={!!pendingToggle} onOpenChange={(o) => !o && setPendingToggle(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingToggle?.status === "Active" ? "Deactivate" : "Activate"}{" "}
              {pendingToggle?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingToggle?.status === "Active"
                ? "Principal and parent logins for this school will be suspended in the demo."
                : "Logins for this school will be re-enabled in the demo."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
            <AlertDialogAction className="rounded-2xl" onClick={confirmToggle}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
