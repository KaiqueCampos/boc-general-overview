"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquare, Pencil, Trash2, X } from "lucide-react";
import { Text } from "@/components/ui/topography";
import { MergeClasses } from "@/utils/mergeClasses";
import { IncidentUpdates } from "@/types/incident";
import { supabase } from "@/lib/db/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FollowUpTimelineProps {
  updates: IncidentUpdates[];
  onEdit?: (update: IncidentUpdates) => void;
}

export function FollowUpTimeline({ updates, onEdit }: FollowUpTimelineProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteUpdate = async (update_id: string) => {
    try {
      if (!deleteId) return;

      const { error } = await supabase
        .from("incident_updates")
        .delete()
        .eq("id", update_id);

      if (error) throw error;

      setDeleteId(null);
      router.refresh();
    } catch (err) {
      console.error("Error deleting update:", err);
    }
  };

  if (!updates || updates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <MessageSquare className="h-8 w-8 mb-2 opacity-40" />
        <Text variant="text" className="text-muted-foreground">
          Sem Reports do Incidente
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
            <div key={update.id} className="relative flex gap-3 pl-2">
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
              <div className="flex-1 rounded-lg border border-border bg-secondary/40 px-4 py-3 mb-2 relative group">
                {/* actions (hover) */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <button
                    onClick={() => onEdit?.(update)}
                    className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteId(update.id)}
                    className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* header */}
                <div className="flex items-center  gap-2 mb-1.5 pr-12">
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
                    (
                    {format(new Date(update.created_at), "dd MMM, HH:mm", {
                      locale: ptBR,
                    })}
                    )
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

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border p-4 rounded-lg w-[320px] space-y-3">
            <Text
              variant="text"
              weight="bold"
              color="text-foreground uppercase"
            >
              Confirmar ação...
            </Text>
            <Text variant="text" weight="medium" color="text-muted-foreground">
              Tem certeza que deseja deletar este report? Ele deixará de
              aparecer na timeline de updates.
            </Text>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                <X className="h-3.5 w-3.5" />
                Cancelar
              </Button>

              <Button
                variant="destructive"
                className="text-sm px-3 py-1 rounded-md bg-red-500 text-white"
                onClick={() => handleDeleteUpdate(deleteId)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remover Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
