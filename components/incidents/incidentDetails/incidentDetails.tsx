`use client`;

import { ScrollArea } from "@/components/ui/scroolArea";
import { Text } from "@/components/ui/topography";
import { getJiraDependencies } from "@/lib/integrations/jira";
import { Incident, IncidentUpdates } from "@/types/incident";
import { JiraDependenciesResult } from "@/types/jira";
import { AnimatePresence, motion } from "framer-motion";
import { AppWindow, Server, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AddFollowUpForm } from "./addFollowUpForm";
import { EmptyIncidentDetails } from "./emptyIncidentDetails";
import { FollowUpTimeline } from "./followUpTimeline";
import { IncidentDetailsHeader } from "./incidentDetailsHeader";
import { IncidentInfo } from "./incidentInfo";
import { parseJiraDependencies } from "@/utils/parseJiraDependencies";
import { IncidentCardDependencies } from "./incidentCardDependencies";

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
  const [jiraDeps, setJiraDeps] = useState<JiraDependenciesResult>(null);

  useEffect(() => {
    async function load() {
      if (!incident?.inc) return;

      const res = await fetch(`/api/jira?issueKey=${incident.inc}`);
      const raw = await res.json();
      const parsed = parseJiraDependencies(raw);

      setJiraDeps(parsed);
    }

    load();
  }, [incident?.inc]);

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
              <IncidentCardDependencies data={jiraDeps} />

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
