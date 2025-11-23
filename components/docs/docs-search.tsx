"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Code, Settings, Book } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DocItem {
  title: string;
  description: string;
  href: string;
  section: string;
  icon: typeof Search;
}

const docItems: DocItem[] = [
  {
    title: "Cars API",
    description: "Complete API reference for car endpoints",
    href: "/docs/api#cars-api",
    section: "API",
    icon: Code,
  },
  {
    title: "Search & Filters",
    description: "How to use search and filtering",
    href: "/docs/api#search-filters",
    section: "API",
    icon: Code,
  },
  {
    title: "Bookings API",
    description: "Manage car rental bookings",
    href: "/docs/api#bookings-api",
    section: "API",
    icon: Code,
  },
  {
    title: "CarsSection Component",
    description: "Server component for displaying cars",
    href: "/docs/components#carssection",
    section: "Components",
    icon: FileText,
  },
  {
    title: "CarsGrid Component",
    description: "Client component for car grid layout",
    href: "/docs/components#carsgrid",
    section: "Components",
    icon: FileText,
  },
  {
    title: "CarSearch Component",
    description: "Search component with autocomplete",
    href: "/docs/components#carsearch",
    section: "Components",
    icon: FileText,
  },
  {
    title: "Installation",
    description: "How to install and set up the platform",
    href: "/docs/getting-started#installation",
    section: "Getting Started",
    icon: Settings,
  },
  {
    title: "Database Setup",
    description: "Configure your database",
    href: "/docs/getting-started#database",
    section: "Getting Started",
    icon: Settings,
  },
  {
    title: "Authentication",
    description: "User authentication setup",
    href: "/docs/getting-started#authentication",
    section: "Getting Started",
    icon: Settings,
  },
  {
    title: "Admin Dashboard",
    description: "Access and use the admin dashboard",
    href: "/docs/admin#dashboard",
    section: "Admin",
    icon: Book,
  },
  {
    title: "Car Management",
    description: "Manage car inventory",
    href: "/docs/admin#car-management",
    section: "Admin",
    icon: Book,
  },
  {
    title: "User Management",
    description: "Manage platform users",
    href: "/docs/admin#user-management",
    section: "Admin",
    icon: Book,
  },
];

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search docs...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {["API", "Components", "Getting Started", "Admin"].map((section) => {
            const sectionItems = docItems.filter((item) => item.section === section);
            if (sectionItems.length === 0) return null;

            return (
              <CommandGroup key={section} heading={section}>
                {sectionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.href}
                      value={`${item.title} ${item.description}`}
                      onSelect={() => handleSelect(item.href)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}

