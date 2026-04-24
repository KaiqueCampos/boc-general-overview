import { LucideIcon } from "lucide-react";
import { Text } from "../ui/topography";
import { MergeClasses } from "@/utils/mergeClasses";

interface IncidentStatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  variant?: "open" | "resolved";
}

export function IncidentStatCard({
  icon: Icon,
  value,
  label,
  variant = "resolved",
}: IncidentStatCardProps) {
  const isOpen = variant === "open";

  return (
    <div
      className={MergeClasses(
        "flex items-center gap-4 rounded-xl px-5 py-3 border",
        isOpen
          ? "border-status-open/40 bg-status-open/20"
          : "border-status-resolved/20 bg-status-resolved/6",
      )}
    >
      <div
        className={MergeClasses(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isOpen ? "bg-status-open/25" : "bg-status-resolved/15",
        )}
      >
        <Icon
          className={MergeClasses(
            "h-4 w-4",
            isOpen ? "text-status-open" : "text-status-resolved",
          )}
        />
      </div>

      <div>
        <Text
          variant="h2"
          weight="bold"
          className={MergeClasses(
            "font-mono leading-none",
            isOpen ? "text-status-open" : "text-status-resolved",
          )}
        >
          {value}
        </Text>

        <Text
          variant="caption"
          weight="medium"
          className="uppercase tracking-wider text-muted-foreground mt-0.5"
        >
          {label}
        </Text>
      </div>
    </div>
  );
}
