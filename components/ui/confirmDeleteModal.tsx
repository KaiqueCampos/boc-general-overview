import { X, Trash2 } from "lucide-react";
import { Text } from "@/components/ui/topography";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  title?: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({
  title = "Confirmar ação...",
  description,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border p-4 rounded-lg w-[320px] space-y-3">
        <Text
          variant="text"
          weight="bold"
          className="text-foreground uppercase"
        >
          {title}
        </Text>

        <Text variant="text" weight="medium" className="text-muted-foreground">
          {description}
        </Text>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-3.5 w-3.5" />
            Cancelar
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="h-3.5 w-3.5" />
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
