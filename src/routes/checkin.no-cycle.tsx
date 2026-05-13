import { createFileRoute } from "@tanstack/react-router";
import { CheckinScreen } from "@/components/sheila/CheckinScreen";
import { exceptionFlows } from "@/data/checkinFlows";

export const Route = createFileRoute("/checkin/no-cycle")({
  component: () => <CheckinScreen flow={exceptionFlows.noCycle} />,
});
