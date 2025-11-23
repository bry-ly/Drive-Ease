import {
  Car,
  Shield,
  Clock,
  CreditCard,
  Headphones,
  MapPin,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            Why Choose Drive Ease?
          </h2>
          <p className="text-muted-foreground">
            Experience the best car rental service with premium vehicles,
            competitive prices, and exceptional customer support for your
            journey.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Car className="size-4" />
              <h3 className="text-sm font-medium">Wide Selection</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose from our extensive fleet of vehicles, from economy to
              luxury, to find the perfect car for your needs.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="size-4" />
              <h3 className="text-sm font-medium">Safe & Insured</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              All our vehicles are regularly maintained, fully insured, and meet
              the highest safety standards for your peace of mind.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <h3 className="text-sm font-medium">24/7 Support</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Our customer support team is available around the clock to assist
              you with any questions or emergencies.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <h3 className="text-sm font-medium">Best Prices</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Enjoy competitive pricing with transparent rates and no hidden
              fees. Flexible rental periods to suit your schedule.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <h3 className="text-sm font-medium">Easy Booking</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Book your perfect car in minutes with our simple online booking
              system. Pick up from multiple convenient locations.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Headphones className="size-4" />
              <h3 className="text-sm font-medium">Customer Care</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Dedicated customer service team committed to making your car
              rental experience smooth and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
