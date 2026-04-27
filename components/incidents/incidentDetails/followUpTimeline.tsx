import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquare } from "lucide-react";
import { Text } from "@/components/ui/topography";
import { MergeClasses } from "@/utils/mergeClasses";
import { IncidentUpdates } from "@/types/incident";

interface FollowUpTimelineProps {
  updates: IncidentUpdates[];
}

export function FollowUpTimeline({ updates }: FollowUpTimelineProps) {
  if (!updates || updates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <MessageSquare className="h-8 w-8 mb-2 opacity-40" />
        <Text variant="text" className="text-muted-foreground">
          No updates yet
        </Text>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-1">
        {updates.map((update, index) => {
          const isLatest = index === updates.length - 1;

          return (
            <div
              key={`${update.created_at}-${index}`}
              className="relative flex gap-3 pl-2"
            >
              {/* dot */}
              <div className="relative z-10 mt-3 flex h-5 w-5 shrink-0 items-center justify-center">
                <div
                  className={MergeClasses(
                    "h-2 w-2 rounded-full",
                    isLatest
                      ? "bg-primary ring-4 ring-primary/10"
                      : "bg-muted-foreground/40",
                  )}
                />
              </div>

              {/* content */}
              <div className="flex-1 rounded-lg border border-border bg-secondary/40 px-4 py-3 mb-2">
                {/* header */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Text
                    as="span"
                    variant="caption"
                    weight="semibold"
                    className="text-foreground"
                  >
                    {update.author}
                  </Text>

                  <Text
                    as="span"
                    variant="caption"
                    className="font-mono text-muted-foreground"
                  >
                    {format(new Date(update.created_at), "dd MMM, HH:mm", {
                      locale: ptBR,
                    })}
                  </Text>
                </div>

                {/* message */}
                <Text
                  variant="text"
                  className="text-secondary-foreground leading-relaxed"
                >
                  {update.message}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
