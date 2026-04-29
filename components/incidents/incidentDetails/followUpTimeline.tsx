"use client";

import { ConfirmDeleteModal } from "@/components/ui/confirmDeleteModal";
import { Text } from "@/components/ui/topography";
import { deleteIncidentUpdate } from "@/lib/db/incident_updates.data";
import { IncidentUpdates } from "@/types/incident";
import { MergeClasses } from "@/utils/mergeClasses";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmptyIncidentUpdatesState } from "./emptyIncidentUpdates";
import { formatDateBR } from "@/utils/time";

interface FollowUpTimelineProps {
  updates: IncidentUpdates[];
  onEdit?: (update: IncidentUpdates) => void;
  currentUserName: string;
}

export function FollowUpTimeline({
  updates,
  onEdit,
  currentUserName,
}: FollowUpTimelineProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function handleDeleteUpdate(id: string) {
    await deleteIncidentUpdate(id);
    setDeleteId(null);
    router.refresh();
  }

  if (!updates || updates.length === 0) {
    return <EmptyIncidentUpdatesState />;
  }

  const sortedUpdates = [...updates].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-1">
        {sortedUpdates.map((update, index) => {
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

                {update.author === currentUserName && (
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
                )}

                {/* header */}
                <div className="flex items-center  gap-2 mb-1.5 pr-12">
                  <Text
                    as="span"
                    variant="caption"
                    weight="semibold"
                    color={
                      update.author === currentUserName
                        ? "text-primary"
                        : "text-foreground"
                    }
                  >
                    {update.author}
                  </Text>

                  <Text
                    as="span"
                    variant="caption"
                    className="font-mono text-muted-foreground"
                  >
                    ({formatDateBR(update.created_at)})
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
        <ConfirmDeleteModal
          description="Tem certeza que deseja deletar este report? Ele deixará de aparecer na timeline de updates."
          onCancel={() => setDeleteId(null)}
          onConfirm={() => handleDeleteUpdate(deleteId)}
        />
      )}
    </div>
  );
}
