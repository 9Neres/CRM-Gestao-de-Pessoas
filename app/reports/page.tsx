"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { IndividualReport } from "@/components/reports/individual-report"
import { TeamReport } from "@/components/reports/team-report"
import { TicketsReport } from "@/components/reports/tickets-report"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Tabs defaultValue="individual" className="space-y-6">
              <TabsList>
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="team">Equipe</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="individual">
                <IndividualReport />
              </TabsContent>

              <TabsContent value="team">
                <TeamReport />
              </TabsContent>

              <TabsContent value="tickets">
                <TicketsReport />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
