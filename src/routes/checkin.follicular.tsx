import { createFileRoute } from "@tanstack/react-router";
import { CheckinScreen } from "@/components/sheila/CheckinScreen";
import { flowsByPhase } from "@/data/checkinFlows";

export const Route = createFileRoute("/checkin/follicular")({
  component: () => <CheckinScreen flow={flowsByPhase.follicular} />,
});
