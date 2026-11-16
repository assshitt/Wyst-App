import { CONDITION_TONE, type Condition } from "@/lib/listings";

export function ConditionBadge({ condition, solid = false }: { condition: Condition; solid?: boolean }) {
  const tone = solid ? "pill-solid" : CONDITION_TONE[condition];
  return <span className={`pill ${tone}`}>{condition}</span>;
}
