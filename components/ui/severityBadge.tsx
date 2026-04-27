import { MergeClasses } from "@/utils/mergeClasses";

type Severity = "P1" | "P2" | "P3";
type Size = "sm" | "lg";

interface SeverityBadgeProps {
  severity: Severity;
  size?: Size;
}

const config: Record<
  Severity,
  {
    bg: string;
    text: string;
    border: string;
    dot: string;
    glow: boolean;
  }
> = {
  P1: {
    bg: "bg-severity-p1/15",
    text: "text-severity-p1",
    border: "border-severity-p1/30",
    dot: "bg-severity-p1",
    glow: true,
  },
  P2: {
    bg: "bg-severity-p2/15",
    text: "text-severity-p2",
    border: "border-severity-p2/30",
    dot: "bg-severity-p2",
    glow: false,
  },
  P3: {
    bg: "bg-severity-p3/15",
    text: "text-severity-p3",
    border: "border-severity-p3/30",
    dot: "bg-severity-p3",
    glow: false,
  },
};

export default function SeverityBadge({
  severity,
  size = "sm",
}: SeverityBadgeProps) {
  const c = config[severity];
  const isLarge = size === "lg";

  return (
    <span
      className={MergeClasses(
        "inline-flex items-center gap-1.5 rounded-md border font-mono font-semibold uppercase tracking-wider",
        c.bg,
        c.text,
        c.border,
        isLarge ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[10px]",
      )}
    >
      <span
        className={MergeClasses(
          "rounded-full",
          c.dot,
          c.glow && "animate-pulse-glow",
          isLarge ? "h-2 w-2" : "h-1.5 w-1.5",
        )}
      />
      {severity}
    </span>
  );
}
