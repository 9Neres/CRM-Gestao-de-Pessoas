"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Clock, Loader2, User } from "lucide-react"
import { useTickets, type Ticket } from "@/hooks/use-tickets"
import { teamMembers } from "./team-data"

function getPriorityColor(priority: string) {
  switch (priority) {
    case "crítica":
      return "bg-destructive text-destructive-foreground"
    case "alta":
      return "bg-chart-2 text-accent-foreground"
    case "média":
      return "bg-chart-4 text-card-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "em-andamento":
      return <Loader2 className="h-4 w-4 animate-spin" />
    case "aguardando":
      return <Clock className="h-4 w-4" />
    case "resolvido":
      return <CheckCircle2 className="h-4 w-4 text-chart-2" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

export function TicketsTable() {
  const { tickets, openTickets, completedTickets, updateTicketStatus, formatMinutes } = useTickets()
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"ativos" | "concluidos">("ativos")
  const [currentPage, setCurrentPage] = useState(0)

  const pageCount = useMemo(() => Math.max(1, Math.ceil(openTickets.length / 10)), [openTickets.length])

  useEffect(() => {
    if (currentPage > pageCount - 1) {
      setCurrentPage(Math.max(0, pageCount - 1))
    }
  }, [pageCount, currentPage])

  const paginatedOpenTickets = useMemo(() => {
    if (!openTickets.length) return []
    const start = currentPage * 10
    return openTickets.slice(start, start + 10)
  }, [openTickets, currentPage])

  const activeList = activeTab === "ativos" ? paginatedOpenTickets : completedTickets

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)
  const selectedAssignee = selectedTicket
    ? teamMembers.find((member) => member.id === selectedTicket.assigneeId)
    : null

  const handleTicketClick = (ticketId: string) => {
    setSelectedTicketId((prev) => (prev === ticketId ? null : ticketId))
  }

  const handleResolve = () => {
    if (!selectedTicket) return
    updateTicketStatus(selectedTicket.id, "resolvido")
    setActiveTab("concluidos")
  }

  const handleAwaiting = () => {
    if (!selectedTicket) return
    updateTicketStatus(selectedTicket.id, "aguardando")
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <CardTitle>Tickets Recentes</CardTitle>
          <Badge variant="outline" className="text-xs">
            Total: {tickets.length}
          </Badge>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
          <TabsList>
            <TabsTrigger value="ativos">Em andamento</TabsTrigger>
            <TabsTrigger value="concluidos">Finalizados</TabsTrigger>
          </TabsList>
        </Tabs>
        {activeTab === "ativos" && pageCount > 1 && (
          <Tabs
            value={`page-${currentPage}`}
            onValueChange={(value) => setCurrentPage(Number(value.replace("page-", "")))}
            className="w-full"
          >
            <TabsList className="flex flex-wrap">
              {Array.from({ length: pageCount }).map((_, index) => (
                <TabsTrigger key={index} value={`page-${index}`} className="text-xs">
                  {index * 10 + 1}-{Math.min((index + 1) * 10, openTickets.length)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab}>
          <TabsContent value="ativos">
            <TicketList
              tickets={paginatedOpenTickets}
              selectedTicketId={selectedTicketId}
              onTicketClick={handleTicketClick}
              formatMinutes={formatMinutes}
            />
          </TabsContent>
          <TabsContent value="concluidos">
            <TicketList
              tickets={completedTickets}
              selectedTicketId={selectedTicketId}
              onTicketClick={handleTicketClick}
              formatMinutes={formatMinutes}
            />
          </TabsContent>
        </Tabs>

        {selectedTicket && (
          <div className="mt-5">
            <Card className="border-primary/30 bg-card/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Detalhes do ticket {selectedTicket.id}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedTicket.title}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 text-sm">
                  <InfoBlock label="Aberto em" value={selectedTicket.openedAt} />
                  <InfoBlock
                    label="Cliente"
                    value={
                      <>
                        <p className="font-semibold">{selectedTicket.client}</p>
                        <p className="text-xs text-muted-foreground">Contato: {selectedTicket.contactPhone}</p>
                      </>
                    }
                  />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">Responsável</p>
                    {selectedAssignee ? (
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-semibold">{selectedAssignee.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedAssignee.role}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="font-semibold mt-1">Equipe disponível</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                      {getStatusIcon(selectedTicket.status)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <InfoBlock label="SLA" value={formatMinutes(selectedTicket.slaMinutes)} />
                  <InfoBlock label="Tempo restante" value={formatMinutes(selectedTicket.remainingMinutes)} />
                </div>

                <div>
                  <p className="text-xs uppercase text-muted-foreground tracking-wide mb-1">Resumo do problema</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{selectedTicket.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="flex-1 min-w-[150px]"
                    onClick={handleResolve}
                    disabled={selectedTicket.status === "resolvido"}
                  >
                    Encerrar ticket
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 min-w-[150px]"
                    onClick={handleAwaiting}
                    disabled={selectedTicket.status === "aguardando" || selectedTicket.status === "resolvido"}
                  >
                    Mover para aguardando
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface TicketListProps {
  tickets: Ticket[]
  selectedTicketId: string | null
  onTicketClick: (id: string) => void
  formatMinutes: (value: number) => string
}

function TicketList({ tickets, selectedTicketId, onTicketClick, formatMinutes }: TicketListProps) {
  if (!tickets.length) {
    return <p className="text-sm text-muted-foreground py-6 text-center">Nenhum ticket nesta aba.</p>
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => onTicketClick(ticket.id)}
          className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
            selectedTicketId === ticket.id ? "bg-secondary/60 border-primary/60" : "hover:bg-secondary/50"
          }`}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{ticket.id}</span>
              <span className="text-xs text-muted-foreground">{ticket.title}</span>
            </div>
            <p className="text-xs text-muted-foreground">{ticket.client}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium">{formatMinutes(ticket.remainingMinutes)}</p>
              <p className="text-xs text-muted-foreground">SLA: {formatMinutes(ticket.slaMinutes)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
              {getStatusIcon(ticket.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function InfoBlock({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase text-muted-foreground tracking-wide">{label}</p>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  )
}
