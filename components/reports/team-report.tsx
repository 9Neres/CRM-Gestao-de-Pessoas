"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DownloadCloud, Users, AlertCircle } from "lucide-react"

const teamRanking = [
  { rank: 1, name: "Thaysa Estanislau", performance: 95, tasks: 28 },
  { rank: 2, name: "Krystian Souto", performance: 92, tasks: 25 },
  { rank: 3, name: "Allef Miguel", performance: 87, tasks: 22 },
  { rank: 4, name: "Ricardo Borges", performance: 84, tasks: 20 },
]

export function TeamReport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatório da Equipe</h2>
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
          <CardTitle>Visão Consolidada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Performance Média</p>
              <p className="text-3xl font-bold">89%</p>
              <p className="text-xs text-green-600 mt-1">Estável</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Tasks</p>
              <p className="text-3xl font-bold">95</p>
              <p className="text-xs text-green-600 mt-1">+8% vs mês anterior</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Taxa SLA</p>
              <p className="text-3xl font-bold">94%</p>
              <p className="text-xs text-green-600 mt-1">Meta: 95%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tickets Resolvidos</p>
              <p className="text-3xl font-bold">78</p>
              <p className="text-xs text-green-600 mt-1">+12 vs mês anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            {teamRanking.map((member) => (
              <div
                key={member.rank}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <Badge className="bg-chart-1 text-chart-1-foreground">#{member.rank}</Badge>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.tasks} tasks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{member.performance}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gargalos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            Gargalos Identificados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
            <p className="font-semibold text-sm">Cobertura de Testes Abaixo da Meta</p>
            <p className="text-xs text-muted-foreground mt-1">
              Performance média 77%, meta 80%. Ação: Dedicar sprint específica para testes.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
            <p className="font-semibold text-sm">Distribuição Desigual de Carga</p>
            <p className="text-xs text-muted-foreground mt-1">
              Thaysa com 28 tasks vs Ricardo com 20. Ação: Redistribuir próximas tarefas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações Estratégicas</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="text-sm">Implementar programa de mentoria entre membros</li>
            <li className="text-sm">Dedicar sprint para aumentar cobertura de testes</li>
            <li className="text-sm">Promover workshop de padrões de código</li>
            <li className="text-sm">Considerar certificação ou treinamento para Ricardo</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
