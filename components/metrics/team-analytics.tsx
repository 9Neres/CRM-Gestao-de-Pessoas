"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Target, Zap } from "lucide-react"

interface TeamAnalytic {
  name: string
  performance: number
  tasks: number
  reviews: number
  prs: number
  testCoverage: number
}

const teamAnalytics: TeamAnalytic[] = [
  {
    name: "Thaysa Estanislau",
    performance: 95,
    tasks: 28,
    reviews: 12,
    prs: 8,
    testCoverage: 82,
  },
  {
    name: "Krystian Souto",
    performance: 92,
    tasks: 25,
    reviews: 14,
    prs: 7,
    testCoverage: 79,
  },
  {
    name: "Allef Miguel",
    performance: 87,
    tasks: 22,
    reviews: 9,
    prs: 11,
    testCoverage: 75,
  },
  {
    name: "Ricardo Borges",
    performance: 84,
    tasks: 20,
    reviews: 8,
    prs: 9,
    testCoverage: 72,
  },
]

export function TeamAnalytics() {
  const avgPerformance = Math.round(teamAnalytics.reduce((a, b) => a + b.performance, 0) / teamAnalytics.length)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análise da Equipe</h2>
        <p className="text-muted-foreground">Visão consolidada dos últimos 30 dias</p>
      </div>

      {/* Team Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Performance Média</p>
              <p className="text-3xl font-bold">{avgPerformance}%</p>
              <p className="text-xs text-green-600 mt-2">Estável</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total de Tasks</p>
              <p className="text-3xl font-bold">95</p>
              <p className="text-xs text-green-600 mt-2">+8% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Code Reviews</p>
              <p className="text-3xl font-bold">43</p>
              <p className="text-xs text-green-600 mt-2">Média: 10.7/pessoa</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Cobertura Testes</p>
              <p className="text-3xl font-bold">77%</p>
              <p className="text-xs text-green-600 mt-2">Meta: 80%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Ranking de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamAnalytics.map((member, index) => (
              <div
                key={member.name}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{member.name}</p>
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{member.tasks} tasks</span>
                      <span>•</span>
                      <span>{member.reviews} reviews</span>
                      <span>•</span>
                      <span>{member.prs} PRs</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-chart-1">{member.performance}%</p>
                  <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-chart-1" style={{ width: `${member.performance}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gargalos Identificados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-chart-2" />
            Gargalos Identificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
              <p className="font-semibold text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Cobertura de Testes Abaixo da Meta
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                3% abaixo da meta de 80%. Ricardo está com 72%, Allef com 75%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <p className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Distribuição Desigual de PRs
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Allef com 11 PRs vs média de 8.75. Considere redistribuição de tarefas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
