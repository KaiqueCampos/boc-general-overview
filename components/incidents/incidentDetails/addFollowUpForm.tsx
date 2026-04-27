import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/topography";
import { ClosedCaption, Send, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/db/supabase";
import { useRouter } from "next/navigation";
import { IncidentUpdates } from "@/types/incident";

interface AddFollowUpFormProps {
  inc: string;
  editingUpdate?: IncidentUpdates | null;
  onCancelEdit?: () => void;
}

export function AddFollowUpForm({
  inc,
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

    try {
      if (editingUpdate) {
        const { error } = await supabase
          .from("incident_updates")
          .update({
            author: author.trim(),
            message: message.trim(),
          })
          .eq("id", editingUpdate.id);

        if (error) throw error;
      } else {
        const { data: incident, error } = await supabase
          .from("incidents")
          .select("id")
          .eq("inc", inc)
          .single();

        if (error || !incident) {
          throw error || new Error("Incident not found");
        }

        const { error: insertError } = await supabase
          .from("incident_updates")
          .insert({
            incident_id: incident.id,
            author: author.trim(),
            message: message.trim(),
          });

        if (insertError) throw insertError;
      }

      setAuthor("");
      setMessage("");

      router.refresh();
    } catch (err) {
      console.error("Error adding incident update:", err);
    }
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
