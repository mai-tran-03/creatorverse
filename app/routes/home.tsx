import type { Route } from "./+types/home";
import { ShowCreators } from "~/components/ShowCreators";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Creatorverse App" },
    { name: "Creatorverse", content: "Share content creators who are worth following, and allow functions to create, update, and delete the list of creators." },
  ];
}

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <ShowCreators />
    </main>
  )
}
