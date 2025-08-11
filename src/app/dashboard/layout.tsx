"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const handleLogout = () => {
    // In a real app, you'd clear session/token here
    router.push('/');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Icons.logo className="size-8 text-primary" />
            <span className="text-lg font-semibold">TransitPass</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" passHref legacyBehavior>
                <SidebarMenuButton isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/dashboard/tasks" passHref legacyBehavior>
                <SidebarMenuButton isActive={pathname === "/dashboard/tasks"} tooltip="Tasks">
                  <ListTodo />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/dashboard/form" passHref legacyBehavior>
                <SidebarMenuButton isActive={pathname === "/dashboard/form"} tooltip="Form">
                  <FileText />
                  <span>Form</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/history" passHref legacyBehavior>
                <SidebarMenuButton isActive={pathname === "/dashboard/history"} tooltip="Pass History">
                  <History />
                  <span>Pass History</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/scan" passHref legacyBehavior>
                <SidebarMenuButton isActive={pathname === "/dashboard/scan"} tooltip="Scan Pass">
                  <ScanLine />
                  <span>Scan Pass</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            
            {/* Collapsible Settings Menu */}
            <SidebarMenuItem>
              <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="justify-between" tooltip="Settings">
                    <div className="flex items-center gap-2">
                      <Settings />
                      <span>Settings</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                       <Link href="/dashboard/settings/profile" passHref legacyBehavior>
                          <SidebarMenuSubButton isActive={pathname === "/dashboard/settings/profile"}>
                            <UserCog />
                            <span>Profile</span>
                          </SidebarMenuSubButton>
                       </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link href="/dashboard/settings/billing" passHref legacyBehavior>
                          <SidebarMenuSubButton isActive={pathname === "/dashboard/settings/billing"}>
                            <CreditCard />
                            <span>Billing</span>
                          </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

          </SidebarMenu>
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
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span className="truncate">John Doe</span>
                              </div>
                              <ChevronDown className="h-4 w-4" />
                           </div>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[var(--sidebar-width)] mb-2" side="top" align="start">
                        <DropdownMenuLabel>
                          <p>John Doe</p>
                          <p className="text-xs text-muted-foreground font-normal">john.doe@example.com</p>
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
            <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="w-full flex-1">
                    <h1 className="text-lg font-semibold md:text-2xl capitalize">{pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</h1>
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
