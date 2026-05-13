import { createFileRoute } from "@tanstack/react-router";
import { CheckinScreen } from "@/components/sheila/CheckinScreen";
import { flowsByPhase } from "@/data/checkinFlows";

export const Route = createFileRoute("/checkin/menstrual")({
  component: () => <CheckinScreen flow={flowsByPhase.menstrual} />,
});
