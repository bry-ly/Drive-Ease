import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookingStatsProps {
  stats: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    total: number;
  };
}

export function BookingStats({ stats }: BookingStatsProps) {
  const statCards = [
    {
      title: "Total Bookings",
      value: stats.total,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      color: "bg-yellow-500",
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      color: "bg-green-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      color: "bg-blue-600",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-5">
      {statCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <Badge className={card.color}>{card.value}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

