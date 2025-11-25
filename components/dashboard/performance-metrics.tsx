"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Code2, GitPullRequest, CheckSquare } from "lucide-react"

const performanceMetrics = [
  {
    label: "Code Reviews",
    value: "156",
    average: "3.1/pessoa",
    icon: Code2,
    trend: "+12%",
  },
  {
    label: "Pull Requests",
    value: "89",
    average: "1.8/pessoa",
    icon: GitPullRequest,
    trend: "+8%",
  },
  {
    label: "Cobertura Testes",
    value: "78%",
    average: "Meta: 80%",
    icon: CheckSquare,
    trend: "+5%",
  },
  {
    label: "Resolução SLA",
    value: "94%",
    average: "Média equipe",
    icon: BarChart3,
    trend: "+2%",
  },
]

export function PerformanceMetrics() {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Métricas de Desempenho (últimos 30 dias)</h3>
        <p className="text-sm text-muted-foreground">Indicadores principais da equipe</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-3xl font-bold mt-1">{metric.value}</p>
                </div>
                <metric.icon className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{metric.average}</span>
                <span className="text-chart-1 font-semibold">{metric.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
