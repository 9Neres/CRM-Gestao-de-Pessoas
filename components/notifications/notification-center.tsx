"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Trash2, AlertCircle, TrendingUp, Zap, Ticket } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: number
  type: "ticket" | "metric" | "sla" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  icon: React.ReactNode
  color: string
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "sla",
    title: "SLA Estourado",
    message: "Ticket Iriy-0001 SLA expirou há 8 minutos",
    timestamp: "5 min",
    read: false,
    icon: <AlertCircle className="h-5 w-5" />,
    color: "bg-destructive/10 text-destructive",
  },
  {
    id: 2,
    type: "ticket",
    title: "Novo Ticket Atribuído",
    message: "Você foi atribuído ao ticket PRO-0003 por Ricardo",
    timestamp: "12 min",
    read: false,
    icon: <Ticket className="h-5 w-5" />,
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    id: 3,
    type: "metric",
    title: "Meta Atingida",
    message: "Você atingiu 95% de performance este mês!",
    timestamp: "1h",
    read: false,
    icon: <TrendingUp className="h-5 w-5" />,
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    id: 4,
    type: "system",
    title: "Manutenção Programada",
    message: "Sistema em manutenção domingo 02:00-06:00",
    timestamp: "1d",
    read: true,
    icon: <Zap className="h-5 w-5" />,
    color: "bg-muted/10 text-muted-foreground",
  },
  {
    id: 5,
    type: "sla",
    title: "Alerta de SLA",
    message: "Ticket Iriy-0123 entrará em amarelo em 4 horas",
    timestamp: "2h",
    read: true,
    icon: <AlertCircle className="h-5 w-5" />,
    color: "bg-chart-4/10 text-chart-4",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((n) => filter === "all" || !n.read)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const deleteAll = () => {
    setNotifications([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Central de Notificações
          </h2>
          <p className="text-sm text-muted-foreground">{unreadCount} notificação(ões) não lida(s)</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Marcar tudo como lido
          </Button>
          <Button size="sm" variant="outline" onClick={deleteAll} disabled={notifications.length === 0}>
            Limpar tudo
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          Todas ({notifications.length})
        </Button>
        <Button size="sm" variant={filter === "unread" ? "default" : "outline"} onClick={() => setFilter("unread")}>
          Não Lidas ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">
                {filter === "unread" ? "Nenhuma notificação não lida" : "Sem notificações"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`cursor-pointer transition-colors ${notif.read ? "opacity-60" : "border-primary/30"}`}
              onClick={() => markAsRead(notif.id)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${notif.color}`}>{notif.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">{notif.message}</p>
                      </div>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {notif.timestamp}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notif.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {!notif.read && <div className="h-1 bg-primary rounded-full mt-3" />}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
