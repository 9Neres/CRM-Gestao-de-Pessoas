"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Bell, Mail, Volume2, VolumeX } from "lucide-react"

interface NotificationSetting {
  type: string
  label: string
  description: string
  inApp: boolean
  email: boolean
  icon: React.ReactNode
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      type: "tickets",
      label: "Notificações de Tickets",
      description: "Atribuição, resposta de cliente, alertas de SLA",
      inApp: true,
      email: true,
      icon: <Bell className="h-5 w-5" />,
    },
    {
      type: "metrics",
      label: "Notificações de Métricas",
      description: "Metas atingidas, performance baixa, recordes",
      inApp: true,
      email: false,
      icon: <Bell className="h-5 w-5" />,
    },
    {
      type: "system",
      label: "Notificações do Sistema",
      description: "Manutenção, novas funcionalidades",
      inApp: true,
      email: false,
      icon: <Bell className="h-5 w-5" />,
    },
  ])

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: "22:00",
    end: "08:00",
  })

  const toggleSetting = (type: string, channel: "inApp" | "email") => {
    setSettings(settings.map((s) => (s.type === type ? { ...s, [channel]: !s[channel] } : s)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações de Notificações</h2>
        <p className="text-muted-foreground">Gerencie como e quando deseja receber notificações</p>
      </div>

      {/* Notification Types */}
      <div className="space-y-3">
        {settings.map((setting) => (
          <Card key={setting.type}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">{setting.icon}</div>
                  <div>
                    <p className="font-semibold">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={setting.inApp ? "default" : "outline"}
                  onClick={() => toggleSetting(setting.type, "inApp")}
                  className="gap-2"
                >
                  <Bell className="h-4 w-4" />
                  In-app {setting.inApp ? "✓" : ""}
                </Button>
                <Button
                  size="sm"
                  variant={setting.email ? "default" : "outline"}
                  onClick={() => toggleSetting(setting.type, "email")}
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email {setting.email ? "✓" : ""}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {quietHours.enabled ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            Horário de Silêncio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="quiet-hours"
              checked={quietHours.enabled}
              onChange={(e) => setQuietHours({ ...quietHours, enabled: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="quiet-hours" className="font-medium">
              Ativar horário de silêncio
            </label>
          </div>

          {quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-secondary/50">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Horário de Início</label>
                <input
                  type="time"
                  value={quietHours.start}
                  onChange={(e) => setQuietHours({ ...quietHours, start: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Horário de Término</label>
                <input
                  type="time"
                  value={quietHours.end}
                  onChange={(e) => setQuietHours({ ...quietHours, end: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            {quietHours.enabled
              ? `Notificações silenciadas de ${quietHours.start} a ${quietHours.end}`
              : "Notificações ativas 24/7"}
          </p>
        </CardContent>
      </Card>

      {/* Notification Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Limites</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
            <span className="text-sm">Máximo de notificações não lidas</span>
            <Badge>50</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Notificações antigas serão marcadas como lidas automaticamente ao atingir o limite
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
