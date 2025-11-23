import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { requireAdmin } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { PopularCars } from "@/components/dashboard/popular-cars"

export default async function DashboardPage() {
  await requireAdmin();

  // Fetch dashboard data
  const [totalCars, totalBookings, totalUsers, totalRevenue, recentBookings, popularCars] = await Promise.all([
    prisma.car.count(),
    prisma.booking.count(),
    prisma.user.count(),
    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      where: { status: { in: ["confirmed", "completed"] } },
    }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        car: {
          select: { make: true, model: true, year: true },
        },
        user: {
          select: { name: true, email: true },
        },
      },
    }),
    prisma.booking.groupBy({
      by: ["carId"],
      _count: { carId: true },
      orderBy: { _count: { carId: "desc" } },
      take: 5,
    }).then(async (groups) => {
      const carIds = groups.map((g) => g.carId);
      const cars = await prisma.car.findMany({
        where: { id: { in: carIds } },
        select: { id: true, make: true, model: true, year: true },
      });
      return groups.map((group) => ({
        car: cars.find((c) => c.id === group.carId)!,
        count: group._count.carId,
      }));
    }),
  ]);

  const metrics = {
    totalCars,
    totalBookings,
    totalUsers,
    totalRevenue: totalRevenue._sum.totalPrice || 0,
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DashboardMetrics metrics={metrics} />
              <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2">
                <RecentBookings bookings={recentBookings} />
                <PopularCars cars={popularCars} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
