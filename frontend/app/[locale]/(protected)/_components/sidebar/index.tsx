"use client"

import * as React from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/components/layout/logo"
import { useAuthContext } from "@/context/auth-provider"
import SidebarData from "./sidebar-data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuthContext()

    const data = SidebarData();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="flex flex-row items-center text-slate-700 text-sm gap-2">
                <Logo size="33px" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
