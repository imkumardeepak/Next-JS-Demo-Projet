
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  History,
  Home,
  LogOut,
  ScanLine,
  User,
  Settings,
  ChevronDown,
  CreditCard,
  UserCog,
  ListTodo,
  FileText,
  Bell,
  Mail,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "@/components/footer";
import { useSession } from "@/hooks/use-session";

const navItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Dashboard",
    tooltip: "Dashboard",
  },
  {
    href: "/dashboard/tasks",
    icon: ListTodo,
    label: "Tasks",
    tooltip: "Tasks",
  },
  {
    href: "/dashboard/form",
    icon: FileText,
    label: "Form",
    tooltip: "Form",
  },
  {
    href: "/dashboard/history",
    icon: History,
    label: "Pass History",
    tooltip: "Pass History",
  },
  {
    href: "/dashboard/scan",
    icon: ScanLine,
    label: "Scan Pass",
    tooltip: "Scan Pass",
  },
  {
    label: "Settings",
    icon: Settings,
    tooltip: "Settings",
    subItems: [
      {
        href: "/dashboard/settings/profile",
        icon: UserCog,
        label: "Profile",
      },
      {
        href: "/dashboard/settings/billing",
        icon: CreditCard,
        label: "Billing",
      },
    ],
  },
];

const NavMenu = () => {
  const pathname = usePathname();
  const [openSettings, setOpenSettings] = React.useState(false);

  React.useEffect(() => {
    // Open settings if a sub-item is active
    if (
      navItems.some((item) =>
        item.subItems?.some((sub) => sub.href === pathname)
      )
    ) {
      setOpenSettings(true);
    }
  }, [pathname]);

  return (
    <SidebarMenu>
      {navItems.map((item, index) =>
        item.subItems ? (
          <SidebarMenuItem key={index}>
            <Collapsible open={openSettings} onOpenChange={setOpenSettings}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="justify-between"
                  tooltip={item.tooltip}
                >
                  <div className="flex items-center gap-2">
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openSettings ? "rotate-180" : ""
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                      <Link href={subItem.href} passHref legacyBehavior>
                        <SidebarMenuSubButton
                          isActive={pathname === subItem.href}
                        >
                          <subItem.icon />
                          <span>{subItem.label}</span>
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        ) : (
          <SidebarMenuItem key={index}>
            <Link href={item.href!} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.tooltip}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoggedIn } = useSession();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
      return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/logofab.png"
              alt="TransitPass Logo"
              width={64}
              height={64}
              className="size-16"
            />
            <span className="text-lg font-semibold">Avyyan Knitfab</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMenu />
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <div className="flex justify-between items-center p-2">
              <SidebarGroupLabel>User</SidebarGroupLabel>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://placehold.co/100x100.png" />
                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{user?.name}</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[var(--sidebar-width)] mb-2"
                    side="top"
                    align="start"
                  >
                    <DropdownMenuLabel>
                      <p>{user?.name}</p>
                      <p className="text-xs text-muted-foreground font-normal">
                        {user?.email}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-svh">
          <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold md:text-2xl capitalize">
                {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
