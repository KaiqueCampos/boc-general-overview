import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/topography";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface AddFollowUpFormProps {
  inc: string;
}

export function AddFollowUpForm({ inc }: AddFollowUpFormProps) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!author.trim() || !message.trim()) return;

    console.log({
      inc,
      author: author.trim(),
      message: message.trim(),
    });

    setAuthor("");
    setMessage("");
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

      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          disabled={!author.trim() || !message.trim()}
          className="gap-1.5"
        >
          <Send className="h-3.5 w-3.5" />
          Adicionar Update
        </Button>
      </div>
    </form>
  );
}
