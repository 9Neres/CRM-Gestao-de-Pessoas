"use client"

import { TicketList } from "@/components/tickets/ticket-list"
import { TicketForm } from "@/components/tickets/ticket-form"
import { TicketDetail } from "@/components/tickets/ticket-detail"
import { DashboardHeader } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useState } from "react"

export default function TicketsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TicketDetail />
              </div>
              <div className="space-y-6">
                <TicketForm />
                <TicketList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
