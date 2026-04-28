"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/ui/topography";
import {
  createIncidentUpdate,
  updateIncidentUpdate,
} from "@/lib/db/incident_updates.data";
import { IncidentUpdates } from "@/types/incident";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AddFollowUpFormProps {
  incidentID: string;
  editingUpdate?: IncidentUpdates | null;
  onCancelEdit?: () => void;
}

export function AddFollowUpForm({
  incidentID,
  editingUpdate,
  onCancelEdit,
}: AddFollowUpFormProps) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (editingUpdate) {
      setAuthor(editingUpdate.author);
      setMessage(editingUpdate.message);
    }
  }, [editingUpdate]);

  function handleCancelEdit() {
    setAuthor("");
    setMessage("");
    onCancelEdit?.();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!author.trim() || !message.trim()) return;
    if (editingUpdate) {
      await updateIncidentUpdate({
        author: author.trim(),
        message: message.trim(),
        id: editingUpdate.id,
      });
    } else {
      console.log(incidentID);

      await createIncidentUpdate({
        incident_id: incidentID,
        author: author.trim(),
        message: message.trim(),
      });
    }

    setAuthor("");
    setMessage("");

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Text
        as="h3"
        variant="caption"
        weight="semibold"
        className="uppercase tracking-wider text-muted-foreground"
      >
        Adicionar Report
      </Text>

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor do Report"
        className="w-full rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm outline-none"
      />

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Adicione aqui a mensagemm de atualização do incidente"
        className="min-h-20 bg-secondary/40 border-border text-sm resize-none"
      />

      <div className="flex justify-end gap-2">
        {editingUpdate && (
          <Button
            type="button"
            size="sm"
            disabled={!author.trim() || !message.trim()}
            className="gap-1.5"
            variant="outline"
            onClick={handleCancelEdit}
          >
            <X className="h-3.5 w-3.5" />
            Cancelar edição
          </Button>
        )}

        <Button
          type="submit"
          size="sm"
          disabled={!author.trim() || !message.trim()}
          className="gap-1.5"
        >
          <Send className="h-3.5 w-3.5" />
          {editingUpdate ? "Salvar Edição" : "Adicionar Update"}
        </Button>
      </div>
    </form>
  );
}
