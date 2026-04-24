import { LucideIcon } from "lucide-react";
import { Text } from "../ui/topography";
import { MergeClasses } from "@/utils/mergeClasses";

type Severity = "p1" | "p2" | "p3";

const severityStyles = {
  p1: {
    border: "border-severity-p1/25",
    bg: "bg-severity-p1/8",
    gradient: "from-black/30 via-transparent",
    text: "text-severity-p1",
    textSoft: "text-severity-p1/80",
    iconBg: "bg-severity-p1/15",
    line: "from-severity-p1/60",
  },
  p2: {
    border: "border-severity-p2/25",
    bg: "bg-severity-p2/8",
    gradient: "from-black/30 via-transparent",
    text: "text-severity-p2",
    textSoft: "text-severity-p2/80",
    iconBg: "bg-severity-p2/15",
    line: "from-severity-p2/60",
  },
  p3: {
    border: "border-severity-p3/25",
    bg: "bg-severity-p3/8",
    gradient: "from-black/30 via-transparent",
    text: "text-severity-p3",
    textSoft: "text-severity-p3/80",
    iconBg: "bg-severity-p3/15",
    line: "from-severity-p3/60",
  },
};

interface SeverityCardProps {
  severity: Severity;
  title: string;
  value: number;
  icon: LucideIcon;
}

export function IncidentSeverityCard({
  severity,
  title,
  value,
  icon: Icon,
}: SeverityCardProps) {
  const styles = severityStyles[severity];

  return (
    <div
      className={MergeClasses(
        "relative overflow-hidden rounded-xl px-4 py-3 border",
        styles.border,
        styles.bg,
      )}
    >
      {/* gradient overlay */}
      <div
        className={MergeClasses(
          "absolute inset-0 pointer-events-none bg-linear-to-br to-transparent",
          styles.gradient,
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <Text
            variant="caption"
            weight="semibold"
            className={MergeClasses(
              "uppercase tracking-widest mb-1",
              styles.textSoft,
            )}
          >
            {title}
          </Text>

          <Text
            variant="h1"
            weight="bold"
            className={MergeClasses("font-mono leading-none", styles.text)}
          >
            {value}
          </Text>

          <Text
            variant="caption"
            weight="medium"
            className="text-muted-foreground mt-1"
          >
            Incidentes em Aberto
          </Text>
        </div>

        <div
          className={MergeClasses(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            styles.iconBg,
          )}
        >
          <Icon className={MergeClasses("h-4 w-4", styles.text)} />
        </div>
      </div>

      {value > 0 && (
        <div
          className={MergeClasses(
            "absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-br to-transparent",
            styles.line,
          )}
        />
      )}
    </div>
  );
}
