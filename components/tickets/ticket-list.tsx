"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertCircle, CheckCircle2, Clock, Loader2, ChevronDown } from "lucide-react"

interface Ticket {
  id: string
  title: string
  client: string
  priority: string
  status: string
  sla: string
  remaining: string
}

const ticketsList: Ticket[] = [
  {
    id: "Iriy-0001",
    title: "Bug crítico em checkout",
    client: "Cliente classe B",
    priority: "crítica",
    status: "em-andamento",
    sla: "2h",
    remaining: "12min",
  },
  {
    id: "Iriy-0001",
    title: "Implementar nova feature de relatórios",
    client: "Cliente classe A",
    priority: "alta",
    status: "em-andamento",
    sla: "8h",
    remaining: "4h 30min",
  },
  {
    id: "Iriy-0123",
    title: "Dúvida sobre integração de API",
    client: "Cliente classe C",
    priority: "média",
    status: "aguardando",
    sla: "24h",
    remaining: "18h",
  },
  {
    id: "Iriy-0002",
    title: "Otimizar performance do dashboard",
    client: "Usuario Free",
    priority: "média",
    status: "aberto",
    sla: "24h",
    remaining: "20h",
  },
  {
    id: "COM-0046",
    title: "Erro de sincronização de dados",
    client: "Empresa E",
    priority: "alta",
    status: "em-andamento",
    sla: "8h",
    remaining: "6h 15min",
  },
]

function getPriorityColor(priority: string) {
  switch (priority) {
    case "crítica":
      return "bg-destructive text-destructive-foreground"
    case "alta":
      return "bg-chart-2 text-primary-foreground"
    case "média":
      return "bg-chart-4 text-primary-foreground"
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
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

export function TicketList() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gerenciador de Tickets</CardTitle>
          <Badge>{ticketsList.length} ativos</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {ticketsList.map((ticket) => (
            <div key={ticket.id}>
              <Button
                variant="ghost"
                className="w-full justify-between px-3 py-2 h-auto"
                onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{ticket.id}</span>
                    <span className="text-xs text-muted-foreground">{ticket.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ticket.client}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="text-right">
                    <p className="text-xs font-medium">{ticket.remaining}</p>
                    <p className="text-xs text-muted-foreground">SLA: {ticket.sla}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    {getStatusIcon(ticket.status)}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${selectedTicket === ticket.id ? "rotate-180" : ""}`}
                  />
                </div>
              </Button>

              {selectedTicket === ticket.id && (
                <div className="border-t pt-3 mt-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="capitalize">
                        {ticket.status === "em-andamento" ? "Em Andamento" : ticket.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prioridade:</span>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
