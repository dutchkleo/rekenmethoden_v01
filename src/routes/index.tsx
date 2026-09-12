import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "@/components/model/calculator";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Calculator />;
}
