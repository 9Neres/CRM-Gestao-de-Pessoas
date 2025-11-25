"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, AlertCircle } from "lucide-react"
import { useTickets } from "@/hooks/use-tickets"

type AlertStatus = "red" | "orange" | "yellow"

function getStatusColor(status: AlertStatus) {
  switch (status) {
    case "red":
      return "bg-destructive/10 border-destructive/30"
    case "orange":
      return "bg-chart-2/10 border-chart-2/30"
    case "yellow":
      return "bg-chart-4/10 border-chart-4/30"
  }
}

function getIcon(status: AlertStatus) {
  switch (status) {
    case "red":
      return <AlertTriangle className="h-5 w-5 text-destructive" />
    case "orange":
      return <Clock className="h-5 w-5 text-chart-2" />
    case "yellow":
    default:
      return <AlertCircle className="h-5 w-5 text-chart-4" />
  }
}

export function SLAAlerts() {
  const { tickets, formatMinutes } = useTickets()

  const alerts = tickets
    .filter((ticket) => ticket.status !== "resolvido")
    .map((ticket) => {
      const status: AlertStatus =
        ticket.remainingMinutes <= 0 ? "red" : ticket.remainingMinutes <= 30 ? "orange" : "yellow"

      const title =
        status === "red" ? "SLA ESTOURADO" : status === "orange" ? "PRÓXIMO DE ESTOURAR" : "ATENÇÃO"

      return {
        ticketId: ticket.id,
        priority: ticket.priority,
        client: ticket.client,
        status,
        title,
        timeRemaining: formatMinutes(ticket.remainingMinutes),
      }
    })
    .filter((alert) => alert.status !== "yellow" || alert.timeRemaining !== "0min")
    .sort((a, b) => {
      const order: Record<AlertStatus, number> = { red: 0, orange: 1, yellow: 2 }
      return order[a.status] - order[b.status]
    })
    .slice(0, 3)

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Alertas de SLA
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum alerta ativo.</p>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.ticketId} className={`p-4 rounded-lg border ${getStatusColor(alert.status)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {getIcon(alert.status)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{alert.ticketId}</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.timeRemaining}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
