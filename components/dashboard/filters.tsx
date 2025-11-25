"use client"

import { useEffect } from "react"

interface FilterOptions {
  period: string
  team: string
  status: string
  priority: string
}

const defaultFilters: FilterOptions = {
  period: "month",
  team: "all",
  status: "all",
  priority: "all",
}

export function DashboardFilters({
  onFiltersChange,
}: {
  onFiltersChange: (filters: FilterOptions) => void
}) {
  useEffect(() => {
    onFiltersChange(defaultFilters)
  }, [onFiltersChange])

  return null
}
