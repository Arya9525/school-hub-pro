import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Role = "super-admin" | "principal";

type Session = {
  role: Role;
  name: string;
  initials: string;
  schoolName: string;
  schoolCode: string;
};

type Ctx = {
  session: Session | null;
  signIn: (role: Role) => void;
  signOut: () => void;
};

const SessionContext = createContext<Ctx | null>(null);

const profiles: Record<Role, Session> = {
  "super-admin": {
    role: "super-admin",
    name: "Arun Malhotra",
    initials: "AM",
    schoolName: "Vidyavarta Network",
    schoolCode: "PLATFORM",
  },
  principal: {
    role: "principal",
    name: "Sunita Patel",
    initials: "SP",
    schoolName: "Sunrise International School",
    schoolCode: "SCH0004",
  },
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo<Ctx>(
    () => ({
      session,
      signIn: (role) => setSession(profiles[role]),
      signOut: () => setSession(null),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}

export function useProfile(fallback: Role) {
  const { session } = useSession();
  return session ?? profiles[fallback];
}
