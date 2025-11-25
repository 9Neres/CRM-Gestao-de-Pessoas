export interface TeamMember {
  id: number
  name: string
  role: string
  performance: number
  tasksCompleted: number
  reviewsCount: number
  prCount: number
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Thaysa Estanislau",
    role: "Desenvolvedora Java",
    performance: 95,
    tasksCompleted: 28,
    reviewsCount: 12,
    prCount: 8,
  },
  {
    id: 2,
    name: "Allef Miguel",
    role: "DevOps",
    performance: 87,
    tasksCompleted: 22,
    reviewsCount: 9,
    prCount: 11,
  },
  {
    id: 3,
    name: "Krystian Souto",
    role: "Analista de suporte",
    performance: 92,
    tasksCompleted: 25,
    reviewsCount: 14,
    prCount: 7,
  },
  {
    id: 4,
    name: "Ricardo Neres",
    role: "Engenheiro de software Java & Kotlin",
    performance: 84,
    tasksCompleted: 20,
    reviewsCount: 8,
    prCount: 9,
  },
]
