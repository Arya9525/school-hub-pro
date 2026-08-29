import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeading } from "@/components/app-shell";
import { ChangePasswordCard } from "@/components/change-password-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/super-admin/settings")({
  head: () => ({
    meta: [
      { title: "Platform Settings · Vidyavarta Super Admin" },
      {
        name: "description",
        content: "Platform-level defaults for school codes, usernames and admin password.",
      },
      { property: "og:title", content: "Platform Settings · Vidyavarta Super Admin" },
      { property: "og:description", content: "Configure platform defaults and your admin password." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeading title="Settings" subtitle="Platform-wide defaults for the school network." />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl bg-card p-5 ring-1 ring-border">
          <h2 className="text-base font-medium">Identifier Patterns</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Applied automatically when a school or parent is created.
          </p>
          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="schoolPattern">School code pattern</Label>
              <Input id="schoolPattern" defaultValue="SCH0000" className="num rounded-2xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="parentPattern">Parent username pattern</Label>
              <Input id="parentPattern" defaultValue="SCH0001-P0451" className="num rounded-2xl" />
              <p className="text-xs text-muted-foreground">
                Phone numbers and email addresses are never used as usernames.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-background p-3 ring-1 ring-border">
              <div>
                <p className="text-sm font-medium">Require password change on first login</p>
                <p className="text-[11px] text-muted-foreground">Applies to principals and parents</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="rounded-2xl" onClick={() => toast.success("Platform settings saved")}>
              Save Changes
            </Button>
          </div>
        </section>
        <ChangePasswordCard />
      </div>
    </>
  );
}
