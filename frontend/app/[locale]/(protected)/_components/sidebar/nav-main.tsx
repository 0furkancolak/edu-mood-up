"use client"

import { type LucideIcon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@/i18n/routing"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>EduMoodUp</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Link href={item.url} key={item.title}>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Link>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
