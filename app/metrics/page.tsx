"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { IndividualMetrics } from "@/components/metrics/individual-metrics"
import { TeamAnalytics } from "@/components/metrics/team-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function MetricsPage() {
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
                <TabsTrigger value="individual">Métricas Individuais</TabsTrigger>
                <TabsTrigger value="team">Análise da Equipe</TabsTrigger>
              </TabsList>

              <TabsContent value="individual">
                <IndividualMetrics />
              </TabsContent>

              <TabsContent value="team">
                <TeamAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
