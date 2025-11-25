"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, CodeSquare, GitPullRequest } from "lucide-react"

interface IndividualMetric {
  label: string
  value: number
  unit: string
  average: number
  trend: number
  icon: React.ReactNode
}

const individualMetrics: Record<string, IndividualMetric> = {
  codeReviews: {
    label: "Code Reviews",
    value: 28,
    unit: "revisões",
    average: 3.1,
    trend: 12,
    icon: <CodeSquare className="h-6 w-6" />,
  },
  pullRequests: {
    label: "Pull Requests",
    value: 15,
    unit: "submissões",
    average: 1.9,
    trend: 8,
    icon: <GitPullRequest className="h-6 w-6" />,
  },
  testCoverage: {
    label: "Cobertura de Testes",
    value: 82,
    unit: "%",
    average: 78,
    trend: 5,
    icon: <BarChart3 className="h-6 w-6" />,
  },
  tasksCompleted: {
    label: "Tasks Concluídas",
    value: 24,
    unit: "tarefas",
    average: 22,
    trend: 3,
    icon: <TrendingUp className="h-6 w-6" />,
  },
}

export function IndividualMetrics({ userName = "Thaysa Estanislau" }: { userName?: string }) {
  const performance =
    (Object.values(individualMetrics).reduce((a, b) => a + b.value, 0) /
      Object.values(individualMetrics).length /
      100) *
    100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Métricas Individuais</h2>
        <p className="text-muted-foreground">Últimos 30 dias - {userName}</p>
      </div>

      {/* Performance Overall */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Performance Geral (30 dias)</p>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-bold">95%</div>
                <div className="flex items-center gap-1 text-green-600 font-semibold mb-2">
                  <TrendingUp className="h-4 w-4" />
                  +12%
                </div>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-chart-1/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-1">95</div>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(individualMetrics).map(([key, metric]) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <div className="text-chart-1">{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      {metric.value}
                      <span className="text-lg text-muted-foreground">{metric.unit}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">+{metric.trend}%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Média equipe: {metric.average}
                    {metric.unit}
                  </span>
                  <span className="font-semibold text-chart-1">{metric.value > metric.average ? "↑" : "↓"} Acima</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Areas de Melhoria */}
      <Card>
        <CardHeader>
          <CardTitle>Áreas de Melhoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
              <p className="font-semibold text-sm">Aumento de PRs</p>
              <p className="text-xs text-muted-foreground">Você está com 15 PRs, 6 a menos que a média da equipe</p>
            </div>
            <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <p className="font-semibold text-sm">Documentação de Code Reviews</p>
              <p className="text-xs text-muted-foreground">Adicione mais detalhes nos comentários de revisão</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
