import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeading } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/super-admin/schools/new")({
  head: () => ({
    meta: [
      { title: "Add School · Vidyavarta Super Admin" },
      {
        name: "description",
        content: "Onboard a new school with its address, contact details and principal login.",
      },
      { property: "og:title", content: "Add School · Vidyavarta Super Admin" },
      { property: "og:description", content: "Create a school and its principal account." },
    ],
  }),
  component: AddSchoolPage,
});

const fields = [
  { id: "name", label: "School Name", placeholder: "Sunrise International School" },
  { id: "code", label: "School Code", placeholder: "SCH0006" },
  { id: "address", label: "Address", placeholder: "Sector 62, Block C" },
  { id: "city", label: "City", placeholder: "Noida" },
  { id: "state", label: "State", placeholder: "Uttar Pradesh" },
  { id: "pincode", label: "Pincode", placeholder: "201309" },
  { id: "email", label: "Email", placeholder: "office@school.edu.in" },
  { id: "contact", label: "Contact Number", placeholder: "+91 98100 00000" },
] as const;

const principalFields = [
  { id: "principalName", label: "Principal Name", placeholder: "Sunita Patel" },
  { id: "username", label: "Username", placeholder: "SCH0006-A001" },
  { id: "tempPassword", label: "Temporary Password", placeholder: "Set a first-login password" },
] as const;

type FieldId = (typeof fields)[number]["id"] | (typeof principalFields)[number]["id"];

function BreadCrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Link to="/super-admin" className="hover:text-foreground">
        Super Admin
      </Link>
      <span>/</span>
      <Link to="/super-admin/schools" className="hover:text-foreground">
        Schools
      </Link>
      <span>/</span>
      <span className="text-foreground/70">Add School</span>
    </nav>
  );
}

function AddSchoolPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Partial<Record<FieldId, string>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [created, setCreated] = useState(false);

  const set = (id: FieldId, v: string) => setValues((prev) => ({ ...prev, [id]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<FieldId, string>> = {};
    [...fields, ...principalFields].forEach((f) => {
      if (!values[f.id]?.trim()) next[f.id] = "Required";
    });
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please complete the highlighted fields");
      return;
    }
    setCreated(true);
    toast.success(`${values.name} created with principal login ${values.username}`);
  };

  if (created) {
    return (
      <>
        <BreadCrumbs />
        <PageHeading title="School created" subtitle="The principal can sign in with the temporary password." />
        <div className="max-w-xl rounded-3xl bg-card p-6 ring-1 ring-border">
          <p className="text-sm">
            <span className="font-medium">{values.name}</span> ({values.code}) has been added to the
            network in this prototype.
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Principal</dt>
              <dd>{values.principalName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Username</dt>
              <dd className="num">{values.username}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">City</dt>
              <dd>{values.city}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button className="rounded-2xl" onClick={() => navigate({ to: "/super-admin/schools" })}>
              Go to Schools
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => {
                setValues({});
                setCreated(false);
              }}
            >
              Add another school
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BreadCrumbs />
      <PageHeading title="Add School" subtitle="Create the school record and its principal login." />

      <form onSubmit={submit} className="max-w-4xl space-y-4">
        <section className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <h2 className="text-base font-medium">School Information</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Used on receipts and the parent portal.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.id} className="space-y-1.5">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  placeholder={f.placeholder}
                  value={values[f.id] ?? ""}
                  onChange={(e) => set(f.id, e.target.value)}
                  aria-invalid={!!errors[f.id]}
                  className="rounded-2xl"
                />
                {errors[f.id] && <p className="text-xs text-destructive">{errors[f.id]}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <h2 className="text-base font-medium">Principal Information</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            The principal changes this password on first login.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {principalFields.map((f) => (
              <div key={f.id} className="space-y-1.5">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  placeholder={f.placeholder}
                  value={values[f.id] ?? ""}
                  onChange={(e) => set(f.id, e.target.value)}
                  aria-invalid={!!errors[f.id]}
                  className="rounded-2xl"
                />
                {errors[f.id] && <p className="text-xs text-destructive">{errors[f.id]}</p>}
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" className="rounded-2xl">
            Create School
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-2xl"
            onClick={() => navigate({ to: "/super-admin/schools" })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
