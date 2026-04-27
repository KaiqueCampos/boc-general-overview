import { format } from "date-fns";
import { Activity, Radio } from "lucide-react";
import { Text } from "../ui/topography";
import { ptBR } from "date-fns/locale";

export function Header() {
  return (
    <header className="shrink-0 border-b border-border bg-card backdrop-blur-sm px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-primary/15 border border-primary/25">
            <Activity className="h-4.5 w-4.5 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-status-open border-2 border-background" />
          </div>
          <div>
            <Text
              variant="h3"
              weight="bold"
              className="text-foreground tracking-tight leading-none"
            >
              BOC - Overview Geral
            </Text>

            <Text
              variant="caption"
              color="text-muted-foreground"
              className="mt-0.5 flex items-center gap-1.5"
            >
              <Radio className="h-2.5 w-2.5 text-status-open text-green-400" />
              <span className="text-green-400">Live</span> —{" "}
              {format(new Date(), "EEE, MMM d yyyy · HH:mm", {
                locale: ptBR,
              })}
            </Text>
          </div>
        </div>
      </div>
    </header>
  );
}
