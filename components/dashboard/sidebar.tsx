"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, Users, Search as SearchIcon, BarChart3, TrendingUp } from "lucide-react"
import { teamMembers } from "./team-data"
import { useTickets } from "@/hooks/use-tickets"

const menuItems = [
  { icon: SearchIcon, label: "Pesquisa", href: "#" },
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Users, label: "Equipes", href: "#" },
]

type ActivePanel = "team" | "search" | null

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isDesktop: boolean
}

export function Sidebar({ isOpen, onClose, isDesktop }: SidebarProps) {
  const { tickets } = useTickets()
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const panelRef = useRef<HTMLDivElement | null>(null)
  const equipesButtonRef = useRef<HTMLButtonElement | null>(null)
  const searchButtonRef = useRef<HTMLButtonElement | null>(null)

  const quickSearchItems = useMemo(() => {
    const ticketItems = tickets.map((ticket) => ({
      id: `ticket-${ticket.id}`,
      type: "Ticket",
      title: `${ticket.id} • ${ticket.title}`,
      subtitle: ticket.client,
    }))

    const clientItems = Array.from(new Set(tickets.map((ticket) => ticket.client))).map((client) => ({
      id: `client-${client}`,
      type: "Cliente",
      title: client,
      subtitle: "Conta ativa",
    }))

    const memberItems = teamMembers.map((member) => ({
      id: `member-${member.id}`,
      type: "Membro",
      title: member.name,
      subtitle: member.role,
    }))

    return [...ticketItems, ...clientItems, ...memberItems]
  }, [tickets])

  const filteredSearchItems = useMemo(() => {
    if (!searchQuery.trim()) return quickSearchItems

    const normalized = searchQuery.toLowerCase()
    return quickSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized),
    )
  }, [searchQuery, quickSearchItems])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !equipesButtonRef.current?.contains(event.target as Node) &&
        !searchButtonRef.current?.contains(event.target as Node)
      ) {
        setActivePanel(null)
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePanel(null)
      }
    }

    if (activePanel) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [activePanel])

  useEffect(() => {
    if (activePanel !== "search") {
      setSearchQuery("")
    }
  }, [activePanel])

  const handleMenuClick = (label: string) => {
    if (label === "Equipes") {
      setActivePanel((prev) => (prev === "team" ? null : "team"))
    } else if (label === "Pesquisa") {
      setActivePanel((prev) => (prev === "search" ? null : "search"))
    } else {
      setActivePanel(null)
    }

    if (!isDesktop) {
      onClose()
    }
  }

  const panelLeftOffset = "calc(16rem + 1rem)"
  const shouldShowPanel = Boolean(activePanel && isDesktop)

  const getButtonRef = (label: string) => {
    if (label === "Equipes") return equipesButtonRef
    if (label === "Pesquisa") return searchButtonRef
    return undefined
  }

  const renderPanelContent = () => {
    if (activePanel === "team") {
      return (
        <Card className="w-[340px] shadow-2xl border-border">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Equipe atual
              </CardTitle>
              <Badge variant="secondary">{teamMembers.length} membros</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="rounded-lg border p-3 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${member.performance}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{member.performance}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3 text-blue-500" />
                      {member.tasksCompleted} tasks
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      {member.reviewsCount} reviews
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-orange-500" />
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

    if (activePanel === "search") {
      return (
        <Card className="w-[360px] shadow-2xl border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <SearchIcon className="h-4 w-4" />
                Pesquisa rápida
              </CardTitle>
              <Badge variant="secondary">{filteredSearchItems.length} resultados</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar tickets, clientes ou membros..."
              className="text-sm"
            />
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredSearchItems.length ? (
                filteredSearchItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-secondary/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {item.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-6">Nenhum resultado encontrado</p>
              )}
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:h-screen`}
      >
        <nav className="p-4 space-y-2 pt-6">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              ref={getButtonRef(item.label)}
              variant="ghost"
              className="w-full justify-start gap-3 text-left"
              title={item.label}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className={isOpen ? "block" : "hidden lg:block"}>{item.label}</span>
            </Button>
          ))}
        </nav>
      </aside>

      {shouldShowPanel && (
        <div ref={panelRef} className="hidden lg:block fixed top-24 z-[60]" style={{ left: panelLeftOffset }}>
          {renderPanelContent()}
        </div>
      )}
    </>
  )
}
