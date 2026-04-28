import { Text } from "@/components/ui/topography";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface IncidentVinculatedCardProps {
  icon: LucideIcon;
  label: string;
  value?: string | null;
  hrefPrefix?: string; // opcional pra montar link (ex: Jira, Datadog)
}

export function IncidentVinculatedCard({
  icon: Icon,
  label,
  value,
  hrefPrefix,
}: IncidentVinculatedCardProps) {
  const hasValue = !!value?.trim();
  const href = hasValue && hrefPrefix ? `${hrefPrefix}${value}` : undefined;

  const Content = (
    <div
      className={[
        "flex items-center gap-3 rounded-md px-3 py-2.5 border transition",
        hasValue
          ? "bg-secondary/50 border-border hover:bg-secondary/70 cursor-pointer group"
          : "bg-muted/30 border-border",
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4 w-4 shrink-0",
          hasValue
            ? "text-primary group-hover:scale-110 transition"
            : "text-muted-foreground",
        ].join(" ")}
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
