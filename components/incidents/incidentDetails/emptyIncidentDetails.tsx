import { Text } from "@/components/ui/topography";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function EmptyIncidentDetails() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-muted-foreground/50"
    >
      <Activity className="h-12 w-12 mb-3 opacity-20" />
      <Text variant="text" weight="medium" color="text-muted-foreground/50">
        Selecione um incidente para visualizar os detalhes
      </Text>

      <Text variant="caption" color="text-muted-foreground/50">
        Clique em um Incidente da lista para expandir
      </Text>
    </motion.div>
  );
}
