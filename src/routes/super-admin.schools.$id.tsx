import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeading, StatCard, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { schools } from "@/lib/mock-data";

export const Route = createFileRoute("/super-admin/schools/$id")({
  head: () => ({
    meta: [
      { title: "School Details · Vidyavarta Super Admin" },
      {
        name: "description",
        content: "School profile with principal login, status and enrolment counts.",
      },
      { property: "og:title", content: "School Details · Vidyavarta Super Admin" },
      { property: "og:description", content: "Review a school's profile and principal account." },
    ],
  }),
  component: SchoolDetails,
});

function SchoolDetails() {
  const { id } = Route.useParams();
  const school = schools.find((s) => s.id === id);

  if (!school) {
    return (
      <div className="rounded-3xl bg-card p-8 text-center ring-1 ring-border">
        <p className="text-sm font-medium">School not found</p>
        <Button asChild variant="outline" className="mt-4 rounded-2xl">
          <Link to="/super-admin/schools">Back to Schools</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/super-admin" className="hover:text-foreground">
          Super Admin
        </Link>
        <span>/</span>
        <Link to="/super-admin/schools" className="hover:text-foreground">
          Schools
        </Link>
        <span>/</span>
        <span className="text-foreground/70">{school.code}</span>
      </nav>

      <PageHeading
        title={school.name}
        subtitle={`${school.code} · ${school.city}, ${school.state}`}
        actions={
          <>
            <Button className="rounded-2xl" onClick={() => toast.info("Edit school form (prototype)")}>
              Edit School
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/super-admin/schools">Back</Link>
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4">
        <StatCard label="Students" value={school.students.toLocaleString("en-IN")} hint="Enrolled" />
        <StatCard label="Classes" value={school.classes} hint="Class 1 to 12" />
        <StatCard label="Sections" value={school.sections} hint="Across all classes" />
        <div className="rounded-3xl bg-card p-4 ring-1 ring-border">
          <p className="text-xs text-muted-foreground">Status</p>
          <div className="mt-3">
            <StatusBadge status={school.status} />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Created {school.createdAt}</p>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <h2 className="text-base font-medium">School Information</h2>
          <dl className="mt-4 divide-y divide-border text-sm">
            {[
              ["School Name", school.name],
              ["School Code", school.code],
              ["Address", school.address],
              ["City", school.city],
              ["State", school.state],
              ["Pincode", school.pincode],
              ["Email", school.email],
              ["Contact", school.contact],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <h2 className="text-base font-medium">Principal Information</h2>
          <dl className="mt-4 divide-y divide-border text-sm">
            {[
              ["Principal Name", school.principalName],
              ["Login Username", school.principalUsername],
              ["Email", school.email],
              ["Phone", school.contact],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <Button
            variant="outline"
            className="mt-5 rounded-2xl"
            onClick={() => toast.success("Temporary password reset and shared with the principal")}
          >
            Reset Principal Password
          </Button>
        </section>
      </div>
    </>
  );
}
