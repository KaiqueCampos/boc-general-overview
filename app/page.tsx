import { Header } from "@/components/header";
import { Incidents } from "@/components/incidents";
import { IncidentStats } from "@/components/incidentStatsResume";
import { Incident } from "@/types/incident";

export const mockIncidents: Incident[] = [
  {
    id: "5e22ea6f-252e-458e-811e-426e9eb47d2e",
    title:
      "INC P1 (Impacto Integral no Transacional) - [KMV] [Abastecimento] - Indisponibilidade Total no Abastecimento Pedido Digitado",
    bocm: "BOCM-102398",
    business_impact: "Abastecimento",
    impacted_service: "Pedido Digitado",
    responsible_team: "SRE",
    platform: "KMV",
    status: "open",
    severity: "P1",
    teams_message_id: "teams-random-902",
    monitor_datadog_id: "datadog-random-902",
    created_at: "2026-04-23 13:59:54.92663+00",
    updated_at: null,
    closed_at: null,
    inc: "INC-902",
    updates: [
      {
        message:
          "Incidente aberto automaticamente pelo monitoramento do Datadog.",
        author: "William Delara",
        created_at: "2026-04-23 13:59:54.92663+00",
      },
      {
        message: "Time de SRE acionado para investigação inicial.",
        author: "Kaique Ferraz",
        created_at: "2026-04-23 14:05:12+00",
      },
      {
        message:
          "Identificada falha na API de abastecimento. Investigando causa raiz.",
        author: "Kaio Reis",
        created_at: "2026-04-23 14:18:40+00",
      },
    ],
  },
  {
    id: "a1b2c3d4-1111-2222-3333-444455556666",
    title: "INC P2 (Degradação Parcial) - [Auth] Falha Intermitente no Login",
    bocm: "BOCM-102399",
    gprob: "GPROB-501",
    business_impact: "Autenticação",
    impacted_service: "Login API",
    responsible_team: "Backend",
    platform: "Auth",
    status: "open",
    severity: "P2",
    teams_message_id: "teams-random-903",
    monitor_datadog_id: "datadog-random-903",
    created_at: "2026-04-24 09:15:10.12345+00",
    updated_at: null,
    closed_at: null,
    inc: "INC-903",
    updates: [
      {
        message: "Falhas intermitentes detectadas no fluxo de login.",
        author: "Carolina Ribeiro",
        created_at: "2026-04-24 09:15:10.12345+00",
      },
      {
        message: "Backend team acionado para análise de autenticação.",
        author: "Arthur Haziro",
        created_at: "2026-04-24 09:20:00+00",
      },
      {
        message: "Suspeita de degradação em serviço de sessão.",
        author: "Kaique Campos",
        created_at: "2026-04-24 09:35:22+00",
      },
    ],
  },
  {
    id: "b7c8d9e0-7777-8888-9999-0000aaaabbbb",
    title: "INC P3 (Baixo Impacto) - [Webhook] Atraso na Entrega de Eventos",
    bocm: "BOCM-102400",
    gprob: "GPROB-502",
    business_impact: "Integrações",
    impacted_service: "Webhook Service",
    responsible_team: "Integrations",
    platform: "Webhook",
    status: "open",
    severity: "P3",
    teams_message_id: "teams-random-904",
    monitor_datadog_id: "datadog-random-904",
    created_at: "2026-04-24 11:42:00.00000+00",
    updated_at: null,
    closed_at: null,
    inc: "INC-904",
    updates: [
      {
        message: "Atraso detectado na fila de eventos webhook.",
        author: "Kaique Ferraz",
        created_at: "2026-04-24 11:42:00.00000+00",
      },
      {
        message: "Equipe de integrações iniciou análise de backlog.",
        author: "Kaique Ferraz",
        created_at: "2026-04-24 11:55:10+00",
      },
    ],
  },
  {
    id: "c1d2e3f4-aaaa-bbbb-cccc-ddddeeeeffff",
    title:
      "INC P2 (Degradação Parcial) - [Payments] Latência Elevada no Processamento",
    bocm: "BOCM-102401",
    gprob: "GPROB-503",
    business_impact: "Pagamentos",
    impacted_service: "Payment Processor",
    responsible_team: "Payments",
    platform: "Core",
    status: "resolved",
    severity: "P2",
    teams_message_id: "teams-random-905",
    monitor_datadog_id: "datadog-random-905",
    created_at: "2026-04-22 16:30:00.00000+00",
    updated_at: "2026-04-22 17:10:00.00000+00",
    closed_at: "2026-04-22 17:10:00.00000+00",
    inc: "INC-905",
    updates: [
      {
        message: "Latência elevada detectada no processamento de pagamentos.",
        author: "Raquel Delara",
        created_at: "2026-04-22 16:30:00.00000+00",
      },
      {
        message: "Equipe de Payments acionada para investigação.",
        author: "Luis Nascimento",
        created_at: "2026-04-22 16:35:00+00",
      },
      {
        message: "Identificado gargalo em serviço de autorização.",
        author: "Helbert Rocha",
        created_at: "2026-04-22 16:50:00+00",
      },
      {
        message: "Correção aplicada e sistema estabilizado.",
        author: "Bruno Pretes",
        created_at: "2026-04-22 17:10:00+00",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden ">
      <Header />
      <IncidentStats incidents={mockIncidents} />
      <Incidents />
    </div>
  );
}
