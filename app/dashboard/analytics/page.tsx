import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default async function AnalyticsPage() {
  await requireAdmin();

  // Get analytics data
  const [
    totalRevenue,
    monthlyRevenue,
    popularCars,
    bookingTrends,
  ] = await Promise.all([
    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      where: { status: { in: ["confirmed", "completed"] } },
    }),
    prisma.booking.findMany({
      where: {
        status: { in: ["confirmed", "completed"] },
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        },
      },
      select: {
        createdAt: true,
        totalPrice: true,
      },
    }).then((bookings) => {
      // Group by month
      const monthlyData: { [key: string]: number } = {};
      bookings.forEach((booking) => {
        const month = new Date(booking.createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
        monthlyData[month] = (monthlyData[month] || 0) + booking.totalPrice;
      });
      return Object.entries(monthlyData).map(([month, revenue]) => ({
        month,
        revenue,
      }));
    }),
    prisma.booking.groupBy({
      by: ["carId"],
      _count: { carId: true },
      orderBy: { _count: { carId: "desc" } },
      take: 10,
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
    prisma.booking.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const analyticsData = {
    totalRevenue: totalRevenue._sum.totalPrice || 0,
    monthlyRevenue, // Already formatted as { month, revenue }[]
    popularCars,
    bookingTrends: bookingTrends.map((t) => ({
      status: t.status,
      count: t._count.status,
    })),
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
              <div className="flex items-center justify-between px-4 lg:px-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
                  <p className="text-muted-foreground">
                    View insights and export reports
                  </p>
                </div>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
              <AnalyticsCharts data={analyticsData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

