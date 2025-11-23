"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconCar,
  IconChartBar,
  IconDashboard,
  IconCalendarEvent,
  IconUsers,
  IconSettings,
  IconCarFilled,
} from "@tabler/icons-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Cars",
    url: "/dashboard/cars",
    icon: IconCar,
  },
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    icon: IconCalendarEvent,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: IconUsers,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: IconChartBar,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: IconSettings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<{
    name: string
    email: string
    image?: string | null
  } | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession()
        if (session?.data?.user) {
          setUser({
            name: session.data.user.name || "User",
            email: session.data.user.email || "",
            image: session.data.user.image,
          })
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    // Listen for auth changes
    const handleAuthChange = () => {
      fetchUser()
    }

    window.addEventListener("custom:auth-changed", handleAuthChange)
    return () => {
      window.removeEventListener("custom:auth-changed", handleAuthChange)
    }
  }, [])

  // Default user data if not loaded yet
  const userData = user || {
    name: "Loading...",
    email: "",
    image: null,
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <IconCarFilled className="size-5!" />
                <span className="text-base font-semibold">Drive Ease</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {!isLoading && <NavUser user={userData} />}
      </SidebarFooter>
    </Sidebar>
  )
}
