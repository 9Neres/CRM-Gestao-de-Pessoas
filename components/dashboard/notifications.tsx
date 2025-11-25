"use client"

import type { ComponentType } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertCircle, Clock3, TrendingUp, CheckCircle2 } from "lucide-react"
import { useTickets } from "@/hooks/use-tickets"

export function NotificationsPanel() {
  const { stats, tickets, formatMinutes } = useTickets()

  const summaryNotifications = [
    {
      id: "sla",
      title: "SLA em risco",
      message:
        stats.slaRisk > 0
          ? `${stats.slaRisk} ticket(s) com menos de 30min`
          : "Nenhum SLA crítico no momento",
      time: "agora",
      badge: "Crítico",
      icon: AlertCircle,
      iconBg: "bg-destructive/20 text-destructive",
    },
    {
      id: "ativos",
      title: "Tickets ativos",
      message: `${stats.open + stats.inProgress + stats.awaiting} tickets aguardando resolução`,
      time: "agora",
      badge: "Fila",
      icon: TrendingUp,
      iconBg: "bg-chart-1/20 text-chart-1",
    },
    {
      id: "finalizados",
      title: "Tickets finalizados",
      message: `${stats.resolved} tickets encerrados hoje`,
      time: "hoje",
      badge: "Sucesso",
      icon: CheckCircle2,
      iconBg: "bg-chart-2/20 text-chart-2",
    },
  ]

  const slaTickets = tickets
    .filter((ticket) => ticket.status !== "resolvido" && ticket.remainingMinutes <= 60)
    .slice(0, 3)

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notificações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {summaryNotifications.map((notif) => (
            <NotificationItem key={notif.id} {...notif} />
          ))}
        </div>

        <div>
          <p className="text-xs uppercase text-muted-foreground mb-2">SLA em risco</p>
          <div className="space-y-2">
            {slaTickets.length ? (
              slaTickets.map((ticket) => (
                <div key={ticket.id} className="rounded-lg border bg-card/60 p-3 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{ticket.id}</p>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{ticket.client}</p>
                  <p className="mt-1">
                    Restante: <span className="font-semibold">{formatMinutes(ticket.remainingMinutes)}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">Nenhum alerta ativo</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface NotificationItemProps {
  title: string
  message: string
  time: string
  badge: string
  icon: ComponentType<{ className?: string }>
  iconBg: string
}

function NotificationItem({ title, message, time, badge, icon: Icon, iconBg }: NotificationItemProps) {
  return (
    <div className="flex gap-3 rounded-xl border bg-card/40 p-3 hover:bg-card/60 transition-colors">
      <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground mt-1">{message}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <Clock3 className="h-3 w-3" />
            {time}
          </div>
        </div>
        <Badge variant="outline" className="mt-2 text-[10px] uppercase tracking-wide">
          {badge}
        </Badge>
      </div>
    </div>
  )
}
