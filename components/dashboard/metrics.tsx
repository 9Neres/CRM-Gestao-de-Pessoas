"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, PauseCircle, PlayCircle, CheckCircle2 } from "lucide-react"
import { useTickets } from "@/hooks/use-tickets"

export function DashboardMetrics() {
  const { stats } = useTickets()

  const metrics = [
    {
      title: "Tickets abertos",
      value: stats.open,
      description: "Fila aguardando triagem",
      icon: AlertCircle,
      color: "bg-destructive/10 text-destructive",
    },
    {
      title: "Em andamento",
      value: stats.inProgress,
      description: "Executando agora",
      icon: PlayCircle,
      color: "bg-chart-1/10 text-chart-1",
    },
    {
      title: "Aguardando",
      value: stats.awaiting,
      description: "Dependendo do cliente",
      icon: PauseCircle,
      color: "bg-chart-4/10 text-chart-4",
    },
    {
      title: "Finalizados",
      value: stats.resolved,
      description: "Encerrados recentemente",
      icon: CheckCircle2,
      color: "bg-chart-2/10 text-chart-2",
    },
  ]

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Visão Geral de Tickets</h2>
        <p className="text-muted-foreground">Atualizado em tempo real conforme o time atua</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
