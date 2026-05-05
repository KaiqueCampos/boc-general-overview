import { Text } from "@/components/ui/topography";
import { MergeClasses } from "@/utils/mergeClasses";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface IncidentVinculatedCardProps {
  icon: LucideIcon;
  label: string;
  value?: string | null;
  hrefPrefix?: string;
  status?: string | null;
}

export function IncidentVinculatedCard({
  icon: Icon,
  label,
  value,
  hrefPrefix,
  status,
}: IncidentVinculatedCardProps) {
  const hasValue = !!value?.trim();
  const href = hasValue && hrefPrefix ? `${hrefPrefix}${value}` : undefined;

  function getStatusStyle(status?: string) {
    if (!status) return "";

    const normalized = status.toLowerCase();

    if (normalized.includes("aguardando")) {
      return "bg-gray-400/20 text-gray-400";
    }

    if (
      normalized.includes("resolvido") ||
      normalized.includes("fechado") ||
      normalized.includes("concluído(a)")
    ) {
      return "bg-status-resolved/20 text-status-resolved";
    }

    return "bg-status-open/20 text-primary";
  }

  const Content = (
    <div
      className={MergeClasses(
        "relative flex items-center gap-3 rounded-md px-3 py-2.5 border transition",
        hasValue
          ? "bg-secondary/50 border-border hover:bg-secondary/70 cursor-pointer group"
          : "bg-muted/30 border-border",
      )}
    >
      {status && (
        <span
          className={MergeClasses(
            "absolute top-1 right-1 text-[9px] px-1.5 py-px rounded font-medium uppercase tracking-wide",
            getStatusStyle(status),
          )}
        >
          {status}
        </span>
      )}

      <Icon
        className={MergeClasses(
          "h-4 w-4 shrink-0",
          hasValue
            ? "text-primary group-hover:scale-110 transition"
            : "text-muted-foreground",
        )}
      />

      <div className="min-w-0">
        <Text
          variant="caption"
          weight="medium"
          className="text-[10px] uppercase tracking-wider"
          color={hasValue ? "text-primary/70" : "text-muted-foreground"}
        >
          {label}
        </Text>

        <Text
          variant="text"
          weight="medium"
          color={hasValue ? "text-foreground" : "text-muted-foreground"}
        >
          {hasValue ? value : "Nenhum"}
        </Text>
      </div>
    </div>
  );

  if (!hasValue) return Content;

  if (href) {
    return (
      <Link href={href} target="_blank">
        {Content}
      </Link>
    );
  }

  return Content;
}
