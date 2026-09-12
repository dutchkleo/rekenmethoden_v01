import { createFileRoute } from "@tanstack/react-router";
import { Board } from "@/components/board/board";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <Board />
    </main>
  );
}
