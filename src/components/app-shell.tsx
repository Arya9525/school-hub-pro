import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronRight, LogOut, Menu, User, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession, type Role } from "@/lib/session";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; to: string };

const notifications = [
  { title: "3 admissions awaiting fee confirmation", time: "12 min ago" },
  { title: "Fee structure for 2026-27 published", time: "2 hours ago" },
  { title: "Green Valley Public School pending activation", time: "Yesterday" },
];

export function AppShell({
  nav,
  role,
  brandLabel,
  children,
}: {
  nav: NavItem[];
  role: Role;
  brandLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { session, signOut } = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const profile = session ?? {
    name: role === "principal" ? "Sunita Patel" : "Arun Malhotra",
    initials: role === "principal" ? "SP" : "AM",
    schoolName: role === "principal" ? "Sunrise International School" : "Vidyavarta Network",
    role,
  };

  const isActive = (to: string) =>
    to === pathname || (to !== `/${role}` && pathname.startsWith(to + "/"));

  const sidebar = (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center gap-3 px-5">
        <div
          className={cn(
            "grid size-9 place-items-center rounded-2xl text-lg font-semibold",
            role === "principal"
              ? "bg-brand text-brand-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          V
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Vidyavarta</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{brandLabel}</p>
        </div>
        <button
          className="ml-auto grid size-8 place-items-center rounded-xl ring-1 ring-border lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Manage
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 text-sm">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors",
              isActive(item.to)
                ? role === "principal"
                  ? "bg-brand/10 font-medium text-brand"
                  : "bg-primary/10 font-medium text-primary"
                : "text-foreground/70 hover:bg-foreground/5",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-3">
        <div className="rounded-2xl bg-sage/10 p-3">
          <p className="text-xs font-medium text-sage">Academic Year 2026-27</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Session closes 28 Mar</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 border-r border-border lg:flex lg:flex-col">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border shadow-xl">
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="grid size-9 place-items-center rounded-xl ring-1 ring-border lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
            <nav className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <span>{role === "principal" ? "Principal" : "Super Admin"}</span>
              <ChevronRight className="size-3" />
              <span className="text-foreground/70">
                {nav.find((n) => isActive(n.to))?.label ?? "Dashboard"}
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="relative grid size-9 place-items-center rounded-xl ring-1 ring-border hover:bg-foreground/5"
                  aria-label="Notifications"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-1.5 size-2 rounded-full bg-brand" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 rounded-2xl p-2">
                <p className="px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Notifications
                </p>
                {notifications.map((n) => (
                  <div key={n.title} className="rounded-xl px-2 py-2 hover:bg-foreground/5">
                    <p className="text-sm leading-snug">{n.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                  </div>
                ))}
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 ring-1 ring-border hover:bg-foreground/5">
                  <span className="grid size-8 place-items-center rounded-full bg-sky/20 text-xs font-semibold text-sky">
                    {profile.initials}
                  </span>
                  <span className="hidden text-left leading-tight sm:block">
                    <span className="block text-sm font-medium">{profile.name}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {role === "principal" ? "Principal" : "Super Admin"}
                    </span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  {profile.schoolName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    navigate({ to: role === "principal" ? "/principal/settings" : "/super-admin/settings" })
                  }
                >
                  <User className="size-4" /> Profile &amp; password
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    navigate({ to: "/login" });
                  }}
                >
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="min-w-0 flex-1 space-y-6 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeading({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl leading-none sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "muted",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "muted" | "sage" | "brand" | "sky";
}) {
  return (
    <div className="rounded-3xl bg-card p-4 ring-1 ring-border">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="num mt-2 font-display text-3xl">{value}</p>
      {hint && (
        <p
          className={cn(
            "mt-1 text-[11px]",
            tone === "sage" && "text-sage",
            tone === "brand" && "text-brand",
            tone === "sky" && "text-sky",
            tone === "muted" && "text-muted-foreground",
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export function Panel({
  title,
  description,
  toolbar,
  children,
  footer,
}: {
  title: string;
  description?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-card ring-1 ring-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h2 className="text-base font-medium">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {toolbar && <div className="flex flex-wrap items-center gap-2">{toolbar}</div>}
      </div>
      {children}
      {footer && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Active" || status === "Paid" || status === "Enrolled"
      ? "bg-sage/15 text-sage"
      : status === "Pending" || status === "Partial"
        ? "bg-gold/20 text-gold"
        : status === "Archived"
          ? "bg-foreground/8 text-muted-foreground"
          : "bg-brand/15 text-brand";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone,
      )}
    >
      {status}
    </span>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="px-4 py-14 text-center">
      <p className="text-sm font-medium">{title}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
