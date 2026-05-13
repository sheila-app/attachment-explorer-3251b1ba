import { createFileRoute, notFound } from "@tanstack/react-router";
import { CheckinScreen } from "@/components/sheila/CheckinScreen";
import { allFlows, type FlowSlug } from "@/data/checkinFlows";

export const Route = createFileRoute("/checkin/$slug")({
  component: CheckinSlugPage,
});

function CheckinSlugPage() {
  const { slug } = Route.useParams();
  const flow = allFlows[slug as FlowSlug];
  if (!flow) throw notFound();
  return <CheckinScreen flow={flow} />;
}
