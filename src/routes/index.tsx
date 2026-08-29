import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Vidyavarta · School Fee Management Portal" },
      {
        name: "description",
        content:
          "Super Admin and Principal portal for school onboarding, admissions, fee structures and discount rules.",
      },
      { property: "og:title", content: "Vidyavarta · School Fee Management Portal" },
      {
        property: "og:description",
        content: "Manage schools, admissions, fees and discounts across your school network.",
      },
    ],
  }),
  component: () => null,
});
