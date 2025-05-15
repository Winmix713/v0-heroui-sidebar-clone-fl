"use client"

import { type ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart2,
  Bell,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Shield,
  Trophy,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Típusdefiníciók
interface PageTemplateProps {
  children: ReactNode
  title?: string
  description?: string
  showHeader?: boolean
  showBreadcrumbs?: boolean
  headerActions?: ReactNode
  className?: string
}

// Navigációs elemek
const navigationItems = [
  {
    id: "dashboard",
    icon: <LayoutDashboard size={20} />,
    title: "Irányítópult",
    href: "/",
  },
  {
    id: "teams",
    icon: <Users size={20} />,
    title: "Csapatok",
    href: "/teams",
  },
  {
    id: "matches",
    icon: <Trophy size={20} />,
    title: "Mérkőzések",
    href: "/matches",
  },
  {
    id: "statistics",
    icon: <BarChart2 size={20} />,
    title: "Statisztikák",
    href: "/statistics",
  },
  {
    id: "calendar",
    icon: <Calendar size={20} />,
    title: "Naptár",
    href: "/calendar",
  },
  {
    id: "league-management",
    icon: <Shield size={20} />,
    title: "Liga kezelés",
    href: "/league-management",
  },
  {
    id: "settings",
    icon: <Settings size={20} />,
    title: "Beállítások",
    href: "/settings",
  },
]

export function PageTemplate({
  children,
  title = "Oldal címe",
  description,
  showHeader = true,
  showBreadcrumbs = true,
  headerActions,
  className,
}: PageTemplateProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  // Aktív menüpont meghatározása az URL alapján
  const getActiveItem = () => {
    if (pathname === "/") return "dashboard"

    const matchingItem = navigationItems.find((item) => pathname?.startsWith(item.href) && item.href !== "/")

    return matchingItem?.id || "dashboard"
  }

  const activeItem = getActiveItem()

  return (
    <SidebarProvider>
      {/* Oldalsáv */}
      <Sidebar variant="floating" collapsible="icon" className="border-r border-border">
        <SidebarHeader className="flex flex-col gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Trophy size={20} />
            </div>
            <span className="text-lg font-semibold">SportLiga</span>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Keresés..."
              className="w-full bg-background pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Főmenü</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={activeItem === item.id} tooltip={item.title}>
                      <a href={item.href}>
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Fiókom</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Beállítások</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Kijelentkezés</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Fő tartalom */}
      <div className="flex flex-1 flex-col">
        {showHeader && (
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger />

            {title && (
              <div className="flex flex-1 flex-col gap-1">
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
            )}

            <div className="flex items-center gap-4">
              {headerActions}

              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>

              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
        )}

        <main className={cn("flex-1 p-6", className)}>{children}</main>
      </div>
    </SidebarProvider>
  )
}
