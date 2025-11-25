"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { NotificationSettings } from "@/components/notifications/notification-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Tabs defaultValue="center" className="space-y-6">
              <TabsList>
                <TabsTrigger value="center">Central</TabsTrigger>
                <TabsTrigger value="settings">aaaaaaaaaaaa</TabsTrigger>
              </TabsList>

              <TabsContent value="center">
                <NotificationCenter />
              </TabsContent>

              <TabsContent value="settings">
                <NotificationSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
