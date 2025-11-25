"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadCloud, CheckCircle2 } from "lucide-react"

export function IndividualReport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatório Individual</h2>
          <p className="text-muted-foreground">Thaysa Estanislau - Dezembro 2024</p>
        </div>
        <Button className="gap-2">
          <DownloadCloud className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Desempenho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Performance</p>
              <p className="text-3xl font-bold">95%</p>
              <p className="text-xs text-green-600 mt-1">+12% vs mês anterior</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tasks Concluídas</p>
              <p className="text-3xl font-bold">28</p>
              <p className="text-xs text-green-600 mt-1">+4 vs mês anterior</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Code Reviews</p>
              <p className="text-3xl font-bold">12</p>
              <p className="text-xs text-green-600 mt-1">Média: 3.1/pessoa</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cobertura Testes</p>
              <p className="text-3xl font-bold">82%</p>
              <p className="text-xs text-yellow-600 mt-1">-2% da meta</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Pontos Fortes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm">Excelente taxa de conclusão de tarefas (28 tasks)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm">Performance acima da média da equipe (95% vs 89%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm">Código reviews de qualidade com comentários detalhados</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">Áreas de Melhoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">!</span>
                <span className="text-sm">Aumentar cobertura de testes (82% vs meta 80%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">!</span>
                <span className="text-sm">Aumentar número de PRs submetidos (8 vs média 11)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">!</span>
                <span className="text-sm">Participar mais de discussões de design/arquitetura</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações para Próximo Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="text-sm">Focar em atingir 85% de cobertura de testes</li>
            <li className="text-sm">Submeter pelo menos 10 PRs no próximo período</li>
            <li className="text-sm">Manter excelente taxa de conclusão de tarefas</li>
            <li className="text-sm">Continuar com qualidade elevada em code reviews</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
