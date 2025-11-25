"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "./header"
import { DashboardMetrics } from "./metrics"
import { TicketsTable } from "./tickets-table"
import { NotificationsPanel } from "./notifications"
import { Sidebar } from "./sidebar"
import { TeamView } from "./team-view"
import { SLAAlerts } from "./sla-alerts"
import { ClientsOverview } from "./clients-overview"
import { PerformanceMetrics } from "./performance-metrics"
import { DashboardFilters } from "./filters"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    const updateSidebarState = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches
      setIsDesktop(matches)
      setSidebarOpen(matches)
    }

    updateSidebarState()
    mediaQuery.addEventListener("change", updateSidebarState)
    return () => mediaQuery.removeEventListener("change", updateSidebarState)
  }, [])

  const toggleSidebar = () => {
    if (isDesktop) {
      setSidebarOpen((prev) => !prev)
    } else {
      setSidebarOpen((prev) => !prev)
    }
  }

  return (
    <div className="relative min-h-screen bg-background lg:flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isDesktop={isDesktop} />

      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-[1px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col relative z-10">
        <DashboardHeader onSidebarToggle={toggleSidebar} />
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Filters */}
            <DashboardFilters onFiltersChange={() => {}} />

            {/* Quick Metrics */}
            <DashboardMetrics />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <TicketsTable />
                <PerformanceMetrics />
              </div>
              <div className="space-y-6">
                <NotificationsPanel />
                <SLAAlerts />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamView />
              <ClientsOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
