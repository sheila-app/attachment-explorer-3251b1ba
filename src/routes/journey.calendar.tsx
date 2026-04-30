import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/journey/calendar")({
  component: () => <Navigate to="/calendar" />,
});
