import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession, type Role } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Vidyavarta Fee Management" },
      {
        name: "description",
        content:
          "Sign in to the Vidyavarta school fee management portal as a Super Admin or Principal.",
      },
      { property: "og:title", content: "Sign in · Vidyavarta Fee Management" },
      {
        property: "og:description",
        content: "School fee management portal for Super Admins and Principals.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useSession();
  const [role, setRole] = useState<Role>("principal");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    schoolCode: "SCH0004",
    userId: "SCH0004-A001",
    password: "demo1234",
  });
  type Errors = { schoolCode?: string; userId?: string; password?: string };
  const [errors, setErrors] = useState<Errors>({});

  const pickRole = (next: Role) => {
    setRole(next);
    setForm(
      next === "super-admin"
        ? { schoolCode: "PLATFORM", userId: "superadmin", password: "demo1234" }
        : { schoolCode: "SCH0004", userId: "SCH0004-A001", password: "demo1234" },
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.schoolCode.trim()) next.schoolCode = "School code is required";
    if (!form.userId.trim()) next.userId = "User ID is required";
    if (form.password.length < 4) next.password = "Minimum 4 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    signIn(role);
    toast.success(role === "super-admin" ? "Signed in as Super Admin" : "Signed in as Principal");
    navigate({ to: role === "super-admin" ? "/super-admin" : "/principal" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-card p-10 ring-1 ring-border lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-brand text-lg font-semibold text-brand-foreground">
            V
          </div>
          <div>
            <p className="font-semibold leading-none">Vidyavarta</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Fee Management Suite</p>
          </div>
        </div>
        <div className="max-w-md">
          <h2 className="font-display text-4xl leading-tight">
            Admissions, fees and discounts in one calm workspace.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Manage schools across your network, admit students, map parents to siblings and keep
            every academic year&apos;s fee structure on record.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { k: "Schools", v: "5" },
              { k: "Students", v: "6,364" },
              { k: "Academic years", v: "2" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-background p-3 ring-1 ring-border">
                <p className="num font-display text-2xl">{s.v}</p>
                <p className="text-[11px] text-muted-foreground">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Prototype build · mock data only, no live records
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <form onSubmit={submit} className="w-full max-w-md space-y-6">
          <div className="lg:hidden">
            <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-card px-3 py-2 ring-1 ring-border">
              <GraduationCap className="size-4 text-brand" />
              <span className="text-sm font-medium">Vidyavarta</span>
            </div>
          </div>
          <div>
            <h1 className="font-display text-3xl">Sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a demo role to explore the portal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-card p-1.5 ring-1 ring-border">
            {(
              [
                { id: "super-admin", label: "Super Admin" },
                { id: "principal", label: "Principal" },
              ] as { id: Role; label: string }[]
            ).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => pickRole(r.id)}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  role === r.id
                    ? "bg-brand/10 text-brand"
                    : "text-muted-foreground hover:bg-foreground/5",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-3xl bg-card p-5 ring-1 ring-border">
            <div className="space-y-1.5">
              <Label htmlFor="schoolCode">School Code</Label>
              <Input
                id="schoolCode"
                value={form.schoolCode}
                onChange={(e) => setForm({ ...form, schoolCode: e.target.value })}
                aria-invalid={!!errors.schoolCode}
              />
              {errors.schoolCode && (
                <p className="text-xs text-destructive">{errors.schoolCode}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                aria-invalid={!!errors.userId}
              />
              {errors.userId && <p className="text-xs text-destructive">{errors.userId}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  aria-invalid={!!errors.password}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Remember me
            </label>
            <Button type="submit" className="w-full rounded-2xl">
              Login
            </Button>
          </div>
          <p className="text-center text-[11px] text-muted-foreground">
            Demo prototype — credentials are pre-filled and not verified.
          </p>
        </form>
      </div>
    </div>
  );
}
