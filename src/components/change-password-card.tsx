import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordCard() {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.next.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (values.next !== values.confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setValues({ current: "", next: "", confirm: "" });
    toast.success("Password updated");
  };

  return (
    <form onSubmit={submit} className="rounded-3xl bg-card p-5 ring-1 ring-border">
      <h2 className="text-base font-medium">Change Password</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Prototype only — nothing is stored or verified.
      </p>
      <div className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="current">Current password</Label>
          <Input
            id="current"
            type="password"
            value={values.current}
            onChange={(e) => setValues({ ...values, current: e.target.value })}
            className="rounded-2xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="next">New password</Label>
          <Input
            id="next"
            type="password"
            value={values.next}
            onChange={(e) => setValues({ ...values, next: e.target.value })}
            aria-invalid={!!error}
            className="rounded-2xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type="password"
            value={values.confirm}
            onChange={(e) => setValues({ ...values, confirm: e.target.value })}
            aria-invalid={!!error}
            className="rounded-2xl"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button type="submit" className="rounded-2xl">
          Update Password
        </Button>
      </div>
    </form>
  );
}
