import { OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Hermann Hakapoka — Intelligence économique & stratégie";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Intelligence économique & stratégie", title: "Comprendre les dynamiques économiques, anticiper les transformations, éclairer la décision." });
}
