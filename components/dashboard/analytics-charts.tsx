"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

interface AnalyticsChartsProps {
  data: {
    totalRevenue: number;
    monthlyRevenue: Array<{ month: string; revenue: number }>;
    popularCars: Array<{ car: { id?: string; make: string; model: string; year: number }; count: number }>;
    bookingTrends: Array<{ status: string; count: number }>;
  };
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>All time revenue from bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ₱{data.totalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <LineChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Trends</CardTitle>
          <CardDescription>Bookings by status</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Count",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <BarChart data={data.bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Cars</CardTitle>
          <CardDescription>Top 10 most booked cars</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.popularCars.slice(0, 10).map((item, index) => (
              <div
                key={item.car.id || `${item.car.make}-${item.car.model}-${item.car.year}-${index}`}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">
                      {item.car.make} {item.car.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.car.year}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">{item.count} bookings</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

