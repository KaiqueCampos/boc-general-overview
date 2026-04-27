import { MergeClasses } from "@/utils/mergeClasses";
import { Circle, CheckCircle2, XCircle } from "lucide-react";

type Status = "open" | "resolved" | "canceled";
type Size = "sm" | "lg";

interface StatusBadgeProps {
  status: Status;
  size?: Size;
}

const config: Record<
  Status,
  {
    icon: typeof Circle;
    label: string;
    bg: string;
    text: string;
    border: string;
  }
> = {
  open: {
    icon: Circle,
    label: "Open",
    bg: "bg-status-open/10",
    text: "text-status-open",
    border: "border-status-open/25",
  },
  resolved: {
    icon: CheckCircle2,
    label: "Resolved",
    bg: "bg-status-resolved/10",
    text: "text-status-resolved",
    border: "border-status-resolved/25",
  },
  canceled: {
    icon: XCircle,
    label: "Canceled",
    bg: "bg-status-canceled/10",
    text: "text-status-canceled",
    border: "border-status-canceled/25",
  },
};

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const c = config[status] ?? config.open;
  const Icon = c.icon;
  const isLarge = size === "lg";

  return (
    <span
      className={MergeClasses(
        "inline-flex items-center gap-1.5 rounded-md border font-medium",
        c.bg,
        c.text,
        c.border,
        isLarge ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]",
      )}
    >
      <Icon className={isLarge ? "h-3.5 w-3.5" : "h-3 w-3"} />
      {c.label}
    </span>
  );
}
