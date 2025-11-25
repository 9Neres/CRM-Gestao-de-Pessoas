"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

export function TicketForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [formData, setFormData] = useState({
    client: "",
    description: "",
    priority: "média",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.client) newErrors.client = "Cliente é obrigatório"
    if (formData.description.length < 20) newErrors.description = "Descrição deve ter no mínimo 20 caracteres"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit?.(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Novo Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Cliente *</label>
            <select
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground mt-1"
            >
              <option value="">Selecione um cliente</option>
              <option value="0116">Cliente classe A</option>
              <option value="0217">Cliente classe B</option>
              <option value="0318">Cliente classe C</option>
            </select>
            {errors.client && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors.client}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Descrição *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o problema (mínimo 20 caracteres)"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground mt-1 resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/20 caracteres</p>
            {errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Prioridade</label>
            <div className="flex gap-2 mt-1">
              {["baixa", "média", "alta", "crítica"].map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant={formData.priority === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className="capitalize"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Criar Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
