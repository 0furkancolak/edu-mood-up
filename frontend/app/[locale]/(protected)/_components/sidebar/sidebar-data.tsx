import { useAuthContext } from '@/context/auth-provider'
import { UserRole } from '@/types'
import { BotIcon, CircleHelpIcon, LayoutDashboardIcon, PercentDiamond, SettingsIcon } from 'lucide-react'
import { TerminalSquare } from 'lucide-react'
import { BookOpenIcon, UsersIcon, HomeIcon } from 'lucide-react'

export default function SidebarData() {
    const { user } = useAuthContext()

    if (user?.role === UserRole.UNIVERSITY) {
        return {
            navMain: [
                {
                    title: "Dashboard",
                    url: "/u/dashboard",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Fakülteler",
                    url: "/u/faculty",
                    icon: TerminalSquare,
                },
                {
                    title: "Bölümler",
                    url: "/u/department",
                    icon: BotIcon,
                },
                {
                    title: "Dersler",
                    url: "/u/lessons",
                    icon: BookOpenIcon,
                },
                {
                    title: "Öğretmenler",
                    url: "/u/teachers",
                    icon: UsersIcon,
                },
                {
                    title: "Öğrenciler",
                    url: "/u/students",
                    icon: UsersIcon,
                },
                {
                    title: "Dönemler",
                    url: "/u/period",
                    icon: PercentDiamond,
                },
                {
                    title: "Ayarlar",
                    url: "/u/university-setting",
                    icon: SettingsIcon,
                },
                {
                    title: "Destek",
                    url: "/u/support",
                    icon: CircleHelpIcon,
                },
            ],
        }
    } else if (user?.role === UserRole.TEACHER) {
        return {
            navMain: [
                {
                    title: "Dashboard",
                    url: "/t/dashboard",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Dersler",
                    url: "/t/lessons",
                    icon: BookOpenIcon,
                },
                {
                    title: "Öğrenciler",
                    url: "/t/student",
                    icon: UsersIcon,
                },
                {
                    title: "Destek",
                    url: "/t/support",
                    icon: CircleHelpIcon,
                },
            ],
        }
    } else if (user?.role === UserRole.STUDENT) {
        return {
            navMain: [
                {
                    title: "Dashboard",
                    url: "/s/dashboard",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Dersler",
                    url: "/s/lessons",
                    icon: BookOpenIcon,
                },
                {
                    title: "Geçmişim",
                    url: "/s/score",
                    icon: UsersIcon,
                },
                {
                    title: "Destek",
                    url: "/s/support",
                    icon: CircleHelpIcon,
                },
            ],
        }
    } else {
        return {
            navMain: [],
        }
    }

}
