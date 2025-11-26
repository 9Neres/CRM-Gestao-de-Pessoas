"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Plus } from "lucide-react"
import { teamMembers as initialTeamMembers, type TeamMember } from "./team-data"

export function TeamView() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [formOpen, setFormOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    role: "",
    shift: "",
  })

  const handleChange = (field: "name" | "age" | "role" | "shift", value: string) => {
    setNewMember((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddMember = (event: React.FormEvent) => {
    event.preventDefault()
    if (!newMember.name.trim() || !newMember.role.trim()) return

    const nextId = members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1

    const member: TeamMember = {
      id: nextId,
      name: newMember.name.trim(),
      role: newMember.role.trim(),
      age: newMember.age ? Number(newMember.age) : undefined,
      shift: newMember.shift.trim() || undefined,
      performance: 80,
      tasksCompleted: 0,
      reviewsCount: 0,
      prCount: 0,
    }

    setMembers((prev) => [...prev, member])
    setNewMember({ name: "", age: "", role: "", shift: "" })
    setFormOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Equipe atual
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge>{members.length} membros</Badge>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-xs"
              onClick={() => setFormOpen((prev) => !prev)}
            >
              <Plus className="h-3 w-3" />
              Novo membro
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {formOpen && (
          <form
            onSubmit={handleAddMember}
            className="mb-4 grid grid-cols-1 gap-2 rounded-lg border bg-card/60 p-3 text-xs sm:grid-cols-2"
          >
            <div className="space-y-1">
              <label className="font-medium">Nome</label>
              <Input
                value={newMember.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Nome completo"
                className="h-8"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">Idade</label>
              <Input
                type="number"
                min={16}
                value={newMember.age}
                onChange={(event) => handleChange("age", event.target.value)}
                placeholder="Ex: 28"
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">Função</label>
              <Input
                value={newMember.role}
                onChange={(event) => handleChange("role", event.target.value)}
                placeholder="Cargo / função"
                className="h-8"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">Horário de expediente</label>
              <Input
                value={newMember.shift}
                onChange={(event) => handleChange("shift", event.target.value)}
                placeholder="Ex: 09h às 18h"
                className="h-8"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFormOpen(false)
                  setNewMember({ name: "", age: "", role: "", shift: "" })
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" size="sm">
                Adicionar
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-3 gap-3">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  {(member.age || member.shift) && (
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {member.age && <span>{member.age} anos</span>}
                      {member.age && member.shift && " • "}
                      {member.shift && <span>Expediente: {member.shift}</span>}
                    </p>
                  )}
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
