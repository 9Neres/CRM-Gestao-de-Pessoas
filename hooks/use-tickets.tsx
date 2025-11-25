"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import type { TeamMember } from "@/components/dashboard/team-data"

export type TicketPriority = "crítica" | "alta" | "média" | "baixa"
export type TicketStatus = "aberto" | "em-andamento" | "aguardando" | "resolvido"

export interface Ticket {
  id: string
  title: string
  client: string
  priority: TicketPriority
  status: TicketStatus
  slaMinutes: number
  remainingMinutes: number
  openedAt: string
  description: string
  contactPhone: string
  assigneeId: TeamMember["id"]
}

export interface TicketInput {
  title: string
  client: string
  priority: TicketPriority
  slaMinutes: number
  description: string
  contactPhone: string
  assigneeId: TeamMember["id"]
}

interface TicketsContextValue {
  tickets: Ticket[]
  openTickets: Ticket[]
  completedTickets: Ticket[]
  stats: {
    open: number
    inProgress: number
    awaiting: number
    resolved: number
    slaRisk: number
  }
  addTicket: (ticket: TicketInput) => void
  updateTicketStatus: (id: string, status: TicketStatus) => void
  formatMinutes: (minutes: number) => string
}

const initialTickets: Ticket[] = [
  {
    id: "Iriy-0001",
    title: "Implementar nova feature de relatórios",
    client: "Cliente classe A",
    priority: "alta",
    status: "em-andamento",
    slaMinutes: 120,
    remainingMinutes: 45,
    openedAt: "Hoje, 08:40",
    description:
      "Cliente precisa de um módulo adicional para detalhar indicadores por filial. A demanda requer integração com o serviço de relatórios existente.",
    contactPhone: "(11) 93333-0101",
    assigneeId: 4,
  },
  {
    id: "Iriy-0003",
    title: "Bug crítico em checkout",
    client: "Cliente classe B",
    priority: "crítica",
    status: "em-andamento",
    slaMinutes: 120,
    remainingMinutes: 12,
    openedAt: "Hoje, 09:10",
    description:
      "Transações são interrompidas quando o cliente aplica cupons. Impacto direto em receita, precisa de correção urgente.",
    contactPhone: "(11) 95555-2211",
    assigneeId: 2,
  },
  {
    id: "Iriy-0123",
    title: "Dúvida sobre integração de API",
    client: "Cliente classe C",
    priority: "média",
    status: "aguardando",
    slaMinutes: 1440,
    remainingMinutes: 1080,
    openedAt: "Ontem, 16:05",
    description: "Equipe do cliente solicitou orientação sobre autenticação e limite de requisições da API pública.",
    contactPhone: "(21) 98888-7744",
    assigneeId: 3,
  },
  {
    id: "Iriy-0002",
    title: "Otimizar performance do dashboard",
    client: "Usuário Free",
    priority: "média",
    status: "aberto",
    slaMinutes: 1440,
    remainingMinutes: 1200,
    openedAt: "Hoje, 07:55",
    description: "Usuário relata lentidão ao carregar gráficos principais. Necessário revisar consultas e cache.",
    contactPhone: "(11) 97777-0909",
    assigneeId: 2,
  },
]

const TicketsContext = createContext<TicketsContextValue | null>(null)

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [counter, setCounter] = useState(() => Math.max(...initialTickets.map((ticket) => parseInt(ticket.id.split("-")[1], 10))) + 1)

  const formatMinutes = useCallback((minutes: number) => {
    if (minutes <= 0) return "0min"
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}min`
  }, [])

  const addTicket = useCallback(
    (ticketData: TicketInput) => {
      setTickets((prev) => {
        const newId = `Iriy-${String(counter).padStart(4, "0")}`
        const now = new Date()
        const openedAt = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(now)

        const newTicket: Ticket = {
          id: newId,
          title: ticketData.title,
          client: ticketData.client,
          priority: ticketData.priority,
          status: "aberto",
          slaMinutes: ticketData.slaMinutes,
          remainingMinutes: ticketData.slaMinutes,
          openedAt: openedAt,
          description: ticketData.description,
          contactPhone: ticketData.contactPhone,
          assigneeId: ticketData.assigneeId,
        }

        return [newTicket, ...prev]
      })

      setCounter((prev) => prev + 1)
    },
    [counter],
  )

  const updateTicketStatus = useCallback((id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status,
              remainingMinutes: status === "resolvido" ? 0 : ticket.remainingMinutes,
            }
          : ticket,
      ),
    )
  }, [])

  const stats = useMemo(() => {
    const open = tickets.filter((ticket) => ticket.status === "aberto").length
    const inProgress = tickets.filter((ticket) => ticket.status === "em-andamento").length
    const awaiting = tickets.filter((ticket) => ticket.status === "aguardando").length
    const resolved = tickets.filter((ticket) => ticket.status === "resolvido").length
    const slaRisk = tickets.filter(
      (ticket) => ticket.status !== "resolvido" && ticket.remainingMinutes <= 30,
    ).length

    return { open, inProgress, awaiting, resolved, slaRisk }
  }, [tickets])

  const value = useMemo<TicketsContextValue>(() => {
    const openTickets = tickets.filter((ticket) => ticket.status !== "resolvido")
    const completedTickets = tickets.filter((ticket) => ticket.status === "resolvido")

    return {
      tickets,
      openTickets,
      completedTickets,
      stats,
      addTicket,
      updateTicketStatus,
      formatMinutes,
    }
  }, [tickets, stats, addTicket, updateTicketStatus, formatMinutes])

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
}

export function useTickets() {
  const context = useContext(TicketsContext)
  if (!context) {
    throw new Error("useTickets deve ser usado dentro de TicketsProvider")
  }
  return context
}

