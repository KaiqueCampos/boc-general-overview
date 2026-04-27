import { Text } from "@/components/ui/topography";
import { Icon, LucideIcon } from "lucide-react";

interface IncidentInfoProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export function IncidentInfo({ icon: Icon, title, value }: IncidentInfoProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-secondary/50 px-3 py-2.5">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <Text
          variant="caption"
          weight="medium"
          className="text-[10px] uppercase tracking-wider"
          color="text-foreground/50"
        >
          {title}
        </Text>

        <Text variant="text" weight="medium" color="text-foreground">
          {value}
        </Text>
      </div>
    </div>
  );
}
