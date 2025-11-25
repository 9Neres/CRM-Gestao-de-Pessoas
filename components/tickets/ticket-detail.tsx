"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, MessageSquare, Clock } from "lucide-react"
import { useState } from "react"

interface TicketMessage {
  id: number
  author: string
  role: "customer" | "agent"
  message: string
  timestamp: string
  attachments?: string[]
}

const initialMessages: TicketMessage[] = [
  {
    id: 1,
    author: "Cliente - João Silva",
    role: "customer",
    message: "Olá, estou com um problema na integração da API. O webhook não está sendo acionado.",
    timestamp: "09:15",
  },
  {
    id: 2,
    author: "Você - Thaysa",
    role: "agent",
    message: "Oi João! Entendi. Vou verificar os logs de integração. Qual é o código de erro que você está recebendo?",
    timestamp: "09:22",
  },
  {
    id: 3,
    author: "Cliente - João Silva",
    role: "customer",
    message: "Status 403 Forbidden. Parece que é um problema de autenticação.",
    timestamp: "09:28",
    attachments: ["error-log.txt"],
  },
]

export function TicketDetail({ ticketId = "Iriy-0001" }: { ticketId?: string }) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [status, setStatus] = useState("em-andamento")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: TicketMessage = {
        id: messages.length + 1,
        author: "Você - Thaysa",
        role: "agent",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
  }

  return (
    <div className="space-y-6">
      {/* Header with SLA Info */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">ID do Ticket</p>
              <p className="text-lg font-semibold">{ticketId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prioridade</p>
              <Badge className="mt-1 bg-destructive text-destructive-foreground">Crítica</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">SLA Restante</p>
              <p className="text-lg font-semibold text-destructive">-8 minutos</p>
            </div>
            <div className="flex items-end gap-2">
              <Button size="sm" onClick={() => handleStatusChange("resolvido")}>
                Resolver
              </Button>
              <Button size="sm" variant="outline">
                Escalar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Info */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Título</p>
              <p className="font-semibold">Bug crítico em checkout</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-semibold">Cliente classe B (Nível A)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Atribuído para</p>
              <p className="font-semibold">Você - Thaysa Estanislau</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {["aberto", "em-andamento", "aguardando", "resolvido"].map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={status === s ? "default" : "outline"}
                    onClick={() => handleStatusChange(s)}
                    className="capitalize"
                  >
                    {s === "em-andamento" ? "Em Andamento" : s === "aguardando" ? "Aguardando" : s}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Descrição</p>
            <p className="text-sm">
              O sistema retorna erro 403 Forbidden na tentativa de processar pagamentos pelo gateway. Isso está
              bloqueando os clientes de completarem compras.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversa com Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "agent" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                    ${msg.role === "agent" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  {msg.author.split(" ")[0][0]}
                </div>
                <div className={`flex-1 ${msg.role === "agent" ? "text-right" : ""}`}>
                  <p className="text-xs text-muted-foreground mb-1">
                    {msg.author}
                    {msg.timestamp && ` • ${msg.timestamp}`}
                  </p>
                  <div
                    className={`inline-block max-w-sm p-3 rounded-lg ${
                      msg.role === "agent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    {msg.attachments && (
                      <div className="mt-2 flex gap-2">
                        {msg.attachments.map((att) => (
                          <Badge key={att} variant="secondary" className="text-xs">
                            {att}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Paperclip className="h-4 w-4" />
              Anexar
            </Button>
            <Input
              placeholder="Digite sua resposta..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button size="sm" onClick={handleSendMessage} className="gap-2">
              <Send className="h-4 w-4" />
              Enviar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SLA Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timeline de SLA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p className="text-sm font-semibold">Ticket Criado</p>
                <p className="text-xs text-muted-foreground">09:00 - Recebido e categorizado</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
              <div>
                <p className="text-sm font-semibold">Atribuído</p>
                <p className="text-xs text-muted-foreground">09:05 - Atribuído a Thaysa</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
              <div>
                <p className="text-sm font-semibold">Em Andamento</p>
                <p className="text-xs text-muted-foreground">09:10 - Iniciou investigação</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">SLA Estourado (Crítico)</p>
                <p className="text-xs text-muted-foreground">11:10 - 8 minutos atrasado</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
