import { CONDITION_STYLES, type Condition } from "@/lib/listings";

export function ConditionBadge({
  condition,
  size = "sm",
}: {
  condition: Condition;
  size?: "sm" | "md";
}) {
  const styles = CONDITION_STYLES[condition];
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${styles.bg} ${styles.text} ${styles.border} ${
        size === "md" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"
      }`}
    >
      {condition}
    </span>
  );
}
