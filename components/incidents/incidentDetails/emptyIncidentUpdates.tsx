import { MessageSquare } from "lucide-react";
import { Text } from "@/components/ui/topography";

export function EmptyIncidentUpdatesState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <MessageSquare className="h-8 w-8 mb-2 opacity-40" />

      <Text variant="text" className="text-muted-foreground">
        Sem Reports do Incidente
      </Text>
    </div>
  );
}
