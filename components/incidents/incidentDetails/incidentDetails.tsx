import { ScrollArea } from "@/components/ui/scroolArea";
import { Text } from "@/components/ui/topography";
import { Incident, IncidentUpdates } from "@/types/incident";
import { AnimatePresence, motion } from "framer-motion";
import { AppWindow, Server, Ticket, Users } from "lucide-react";
import { useState } from "react";
import { AddFollowUpForm } from "./addFollowUpForm";
import { EmptyIncidentDetails } from "./emptyIncidentDetails";
import { FollowUpTimeline } from "./followUpTimeline";
import { IncidentDetailsHeader } from "./incidentDetailsHeader";
import { IncidentInfo } from "./incidentInfo";
import { IncidentVinculatedCard } from "./incidentVinculatedCards";

interface IncidentDetailsProps {
  incident: Incident | null;
  onClose: () => void;
  userName: string;
}

export function IncidentDetails({
  incident,
  onClose,
  userName,
}: IncidentDetailsProps) {
  const [editingUpdate, setEditingUpdate] = useState<IncidentUpdates | null>(
    null,
  );

  return (
    <div className="flex min-h-0 w-full">
      <AnimatePresence mode="wait">
        {incident ? (
          <motion.div
            key={incident.inc}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full w-full bg-card border-l border-border"
          >
            <ScrollArea className="flex-1">
              <IncidentDetailsHeader incident={incident} onClose={onClose} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-6">
                <IncidentVinculatedCard
                  icon={Ticket}
                  label="INC"
                  value={incident.inc}
                  hrefPrefix="https://abasteceai.atlassian.net/browse/"
                />

                <IncidentVinculatedCard
                  icon={Ticket}
                  label="BOCM"
                  value={incident.bocm}
                  hrefPrefix="https://abasteceai.atlassian.net/browse/"
                />

                <IncidentVinculatedCard
                  icon={Ticket}
                  label="GPROB"
                  value={incident.gprob}
                  hrefPrefix="https://abasteceai.atlassian.net/browse/"
                />
              </div>

              <div className="px-6 py-4 space-y-6">
                {/* Info grid */}
                <div className="grid grid-cols-1 gap-2">
                  <IncidentInfo
                    icon={AppWindow}
                    title="Plataforma"
                    value={incident.platform}
                  />

                  <IncidentInfo
                    icon={Server}
                    title="Impacto de Negócio"
                    value={incident.business_impact}
                  />

                  <IncidentInfo
                    icon={Server}
                    title="Serviço Afetado"
                    value={incident.impacted_service}
                  />

                  <IncidentInfo
                    icon={Users}
                    title="Time Responsável"
                    value={incident.responsible_team}
                  />
                </div>

                {/* FollowUp Timeline */}
                <div>
                  <Text
                    variant="caption"
                    weight="bold"
                    color="text-muted-foreground"
                    className="uppercase tracking-wider  mb-3"
                  >
                    Timeline dos Reports ({incident.incident_updates.length})
                  </Text>

                  <FollowUpTimeline
                    updates={incident.incident_updates}
                    onEdit={(update) => setEditingUpdate(update)}
                    currentUserName={userName}
                  />
                </div>

                {/* Add follow-up */}
                <AddFollowUpForm
                  incidentID={incident.id}
                  editingUpdate={editingUpdate}
                  onCancelEdit={() => setEditingUpdate(null)}
                  userName={userName}
                />
              </div>
            </ScrollArea>
          </motion.div>
        ) : (
          <EmptyIncidentDetails />
        )}
      </AnimatePresence>
    </div>
  );
}
