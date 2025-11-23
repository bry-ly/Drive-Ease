import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PopularCarsProps {
  cars: Array<{
    car: {
      id: string
      make: string
      model: string
      year: number
    }
    count: number
  }>
}

export function PopularCars({ cars }: PopularCarsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Cars</CardTitle>
        <CardDescription>Most booked cars</CardDescription>
      </CardHeader>
      <CardContent>
        {cars.length === 0 ? (
          <p className="text-sm text-muted-foreground">No booking data yet</p>
        ) : (
          <div className="space-y-4">
            {cars.map((item, index) => (
              <div key={item.car.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">
                      {item.car.make} {item.car.model}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.car.year}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.count}</p>
                  <p className="text-xs text-muted-foreground">bookings</p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/cars">
                View All Cars
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

