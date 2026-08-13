import type { Metadata } from "next";
import CosmicPinball from "./game/CosmicPinball";

export const metadata: Metadata = {
  title: "Starforge Reactor — Cosmic Pinball",
  description: "An original, playable cosmic pinball table in your browser.",
};

export default function Home() {
  return <CosmicPinball />;
}
