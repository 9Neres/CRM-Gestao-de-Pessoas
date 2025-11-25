"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users } from "lucide-react"
import { teamMembers } from "./team-data"

export function TeamView() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Equipe atual
          </CardTitle>
          <Badge>4 membros</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{ width: `${member.performance}%` }} />
                  </div>
                  <span className="text-sm font-semibold">{member.performance}%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3 text-chart-1" />
                  {member.tasksCompleted} tasks
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-chart-2" />
                  {member.reviewsCount} reviews
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-chart-3" />
                  {member.prCount} PRs
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
