"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DownloadCloud, Clock } from "lucide-react"

export function TicketsReport() {
  const ticketsData = {
    total: 78,
    resolved: 73,
    pending: 5,
    avgResolutionTime: "2.4h",
    slaCompliance: 94,
    topClients: [
      { name: "Cliente classe A", tickets: 18, resolved: 16 },
      { name: "Cliente classe B", tickets: 15, resolved: 14 },
      { name: "Cliente classe C", tickets: 12, resolved: 11 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatório de Tickets</h2>
          <p className="text-muted-foreground">Dezembro 2024</p>
        </div>
        <Button className="gap-2">
          <DownloadCloud className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral de Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Tickets</p>
              <p className="text-3xl font-bold">{ticketsData.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Resolvidos</p>
              <p className="text-3xl font-bold text-green-600">{ticketsData.resolved}</p>
              <p className="text-xs text-green-600 mt-1">93.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">SLA Compliance</p>
              <p className="text-3xl font-bold">{ticketsData.slaCompliance}%</p>
              <p className="text-xs text-green-600 mt-1">Meta: 95%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tempo Médio</p>
              <p className="text-3xl font-bold">{ticketsData.avgResolutionTime}</p>
              <p className="text-xs text-green-600 mt-1">Redução 12%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { priority: "Crítica", count: 12, resolved: 11 },
              { priority: "Alta", count: 28, resolved: 26 },
              { priority: "Média", count: 25, resolved: 24 },
              { priority: "Baixa", count: 13, resolved: 12 },
            ].map((p) => (
              <div key={p.priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{p.priority}</span>
                  <Badge variant="outline">{p.count}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1" style={{ width: `${(p.resolved / p.count) * 100}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{Math.round((p.resolved / p.count) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Mais Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ticketsData.topClients.map((client) => (
              <div key={client.name} className="p-3 rounded-lg border hover:bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{client.name}</p>
                  <Badge>{client.tickets} tickets</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{client.resolved} resolvidos</span>
                  <span className="text-green-600 font-semibold">
                    {Math.round((client.resolved / client.tickets) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SLA Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Análise de SLA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-green-100/50 border border-green-200">
            <p className="font-semibold text-sm">SLA Cumprido</p>
            <p className="text-2xl font-bold text-green-600">73 tickets</p>
            <p className="text-xs text-muted-foreground">93.5% do total</p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100/50 border border-yellow-200">
            <p className="font-semibold text-sm">SLA em Risco</p>
            <p className="text-2xl font-bold text-yellow-600">3 tickets</p>
            <p className="text-xs text-muted-foreground">Necessita atenção imediata</p>
          </div>
          <div className="p-3 rounded-lg bg-red-100/50 border border-red-200">
            <p className="font-semibold text-sm">SLA Estourado</p>
            <p className="text-2xl font-bold text-red-600">2 tickets</p>
            <p className="text-xs text-muted-foreground">Necessita ação urgente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
