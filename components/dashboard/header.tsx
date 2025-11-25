"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Settings, LogOut, Moon, Sun, Github, Plus, AlertTriangle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useTickets } from "@/hooks/use-tickets"
import { teamMembers } from "./team-data"

const GITHUB_URL = "https://github.com"

const defaultTicketForm = {
  title: "",
  client: "",
  priority: "média" as const,
  slaMinutes: 120,
  description: "",
  contactPhone: "(00) 0000-0000",
  assigneeId: teamMembers[0]?.id ?? 1,
}

export function DashboardHeader({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  const { user, logout } = useAuth()
  const { stats, openTickets, addTicket, formatMinutes } = useTickets()
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [ticketForm, setTicketForm] = useState(defaultTicketForm)

  const notificationRef = useRef<HTMLDivElement | null>(null)
  const notificationButtonRef = useRef<HTMLButtonElement | null>(null)
  const ticketFormRef = useRef<HTMLDivElement | null>(null)
  const ticketButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        showNotifications &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !notificationButtonRef.current?.contains(event.target as Node)
      ) {
        setShowNotifications(false)
      }
      if (
        showTicketForm &&
        ticketFormRef.current &&
        !ticketFormRef.current.contains(event.target as Node) &&
        !ticketButtonRef.current?.contains(event.target as Node)
      ) {
        setShowTicketForm(false)
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowNotifications(false)
        setShowTicketForm(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [showNotifications, showTicketForm])

  const isDark = theme === "dark"
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  const slaAtRisk = useMemo(
    () =>
      openTickets
        .filter((ticket) => ticket.remainingMinutes <= 60)
        .sort((a, b) => a.remainingMinutes - b.remainingMinutes)
        .slice(0, 3),
    [openTickets],
  )

  const handleTicketFormChange = (field: string, value: string | number) => {
    setTicketForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreateTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!ticketForm.title.trim() || !ticketForm.client.trim()) return

    addTicket({
      title: ticketForm.title,
      client: ticketForm.client,
      priority: ticketForm.priority,
      slaMinutes: Number(ticketForm.slaMinutes),
      description: ticketForm.description || "Ticket criado manualmente via painel",
      contactPhone: ticketForm.contactPhone,
      assigneeId: Number(ticketForm.assigneeId),
    })

    setTicketForm(defaultTicketForm)
    setShowTicketForm(false)
  }

  const ticketsAtivos = stats.open + stats.inProgress + stats.awaiting

  return (
    <header className="border-b border-border bg-card">
      <div className="flex flex-col gap-4 p-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onSidebarToggle} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Gereciador de Equipes - Iriy</h1>
            <p className="text-xs text-muted-foreground">Central de tickets e desempenho</p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative flex-wrap justify-end">
          <Button
            ref={notificationButtonRef}
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => {
              setShowNotifications((prev) => !prev)
              setShowTicketForm(false)
            }}
            title="Resumo de notificações"
          >
            <Bell className="h-5 w-5" />
            {stats.slaRisk > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.alert("Em desenvolvimento")}
            title="Configurações"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleTheme} title="Alternar tema" disabled={!mounted}>
            {mounted && isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
            title="Abrir GitHub"
          >
            <Github className="h-5 w-5" />
          </Button>

          <Button
            ref={ticketButtonRef}
            size="sm"
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              setShowTicketForm((prev) => !prev)
              setShowNotifications(false)
            }}
            title="Criar novo ticket"
          >
            <Plus className="h-4 w-4" />
            Novo ticket
          </Button>

          <div className="flex items-center gap-2 pl-2 border-l">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} title="Sair">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {showNotifications && (
            <div
              ref={notificationRef}
              className="absolute right-0 top-14 z-50 w-80 rounded-xl border bg-card p-4 shadow-2xl"
            >
              <p className="text-sm font-semibold mb-2">Resumo rápido</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border bg-muted/20 p-3">
                  <p className="text-xs text-muted-foreground">Tickets ativos</p>
                  <p className="text-xl font-bold">{ticketsAtivos}</p>
                </div>
                <div className="rounded-lg border bg-muted/20 p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    SLA em risco
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                  </p>
                  <p className="text-xl font-bold text-destructive">{stats.slaRisk}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {slaAtRisk.length ? (
                  slaAtRisk.map((ticket) => (
                    <div key={ticket.id} className="rounded-lg border p-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{ticket.id}</span>
                        <Badge className="text-[10px]">{ticket.priority}</Badge>
                      </div>
                      <p className="text-muted-foreground">{ticket.title}</p>
                      <p className="mt-1 text-muted-foreground">
                        Restante: {formatMinutes(ticket.remainingMinutes)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-3">Nenhum SLA em risco</p>
                )}
              </div>
            </div>
          )}

          {showTicketForm && (
            <div
              ref={ticketFormRef}
              className="absolute right-0 top-14 z-50 w-[380px] rounded-2xl border bg-card p-4 shadow-2xl"
            >
              <p className="text-sm font-semibold mb-3">Novo ticket (estilo Jira)</p>
              <form className="space-y-3 text-sm" onSubmit={handleCreateTicket}>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Título</label>
                  <Input
                    value={ticketForm.title}
                    onChange={(event) => handleTicketFormChange("title", event.target.value)}
                    placeholder="Descrição breve"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Cliente</label>
                  <Input
                    value={ticketForm.client}
                    onChange={(event) => handleTicketFormChange("client", event.target.value)}
                    placeholder="Cliente ou equipe"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Prioridade</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(event) => handleTicketFormChange("priority", event.target.value)}
                      className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                    >
                      <option value="crítica">Crítica</option>
                      <option value="alta">Alta</option>
                      <option value="média">Média</option>
                      <option value="baixa">Baixa</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">SLA (minutos)</label>
                    <Input
                      type="number"
                      min={30}
                      value={ticketForm.slaMinutes}
                      onChange={(event) =>
                        handleTicketFormChange("slaMinutes", Number(event.target.value) || 30)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Responsável</label>
                  <select
                    value={ticketForm.assigneeId}
                    onChange={(event) => handleTicketFormChange("assigneeId", Number(event.target.value))}
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  >
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Contato</label>
                  <Input
                    value={ticketForm.contactPhone}
                    onChange={(event) => handleTicketFormChange("contactPhone", event.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Descrição</label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(event) => handleTicketFormChange("description", event.target.value)}
                    className="w-full rounded-md border border-border bg-background px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    rows={3}
                    placeholder="Detalhe o problema..."
                  />
                </div>
                <Button type="submit" size="sm" className="w-full">
                  Criar ticket
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
