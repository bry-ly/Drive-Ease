import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCar, IconCalendarEvent, IconUsers, IconCash } from "@tabler/icons-react"

interface DashboardMetricsProps {
  metrics: {
    totalCars: number
    totalBookings: number
    totalUsers: number
    totalRevenue: number
  }
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  const metricCards = [
    {
      title: "Total Cars",
      value: metrics.totalCars.toLocaleString(),
      icon: IconCar,
      description: "Cars in inventory",
    },
    {
      title: "Total Bookings",
      value: metrics.totalBookings.toLocaleString(),
      icon: IconCalendarEvent,
      description: "All bookings",
    },
    {
      title: "Total Users",
      value: metrics.totalUsers.toLocaleString(),
      icon: IconUsers,
      description: "Registered users",
    },
    {
      title: "Total Revenue",
      value: `₱${metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: IconCash,
      description: "From confirmed bookings",
    },
  ]

  return (
    <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

