"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const clients = [
  {
    code: "0116",
    name: "Empresas level",
    level: "A",
    billing: "R$ 150k/mês",
    tickets: 12,
    revenue: "R$ 1.8M/ano",
  },
  {
    code: "0217",
    name: "Empresa level",
    level: "B",
    billing: "R$ 120k/mês",
    tickets: 8,
    revenue: "R$ 1.44M/ano",
  },
  {
    code: "0318",
    name: "Empresas level",
    level: "C",
    billing: "R$ 45k/mês",
    tickets: 5,
    revenue: "R$ 540k/ano",
  },
  {
    code: "0419",
    name: "Usuario Free",
    level: "free",
    billing: "R$ 0k/mês",
    tickets: 3,
    revenue: "R$ 0k/ano",
  },
]

function getLevelColor(level: string) {
  switch (level) {
    case "A":
      return "bg-chart-1 text-primary-foreground"
    case "B":
      return "bg-chart-2 text-primary-foreground"
    case "C":
      return "bg-chart-3 text-primary-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function ClientsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.code}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{client.name}</span>
                  <Badge className={getLevelColor(client.level)}>{client.level}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{client.billing}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{client.tickets}</p>
                <p className="text-xs text-muted-foreground">tickets</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
