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
                    url: "/dashboard",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Fakülteler",
                    url: "/faculty",
                    icon: TerminalSquare,
                },
                {
                    title: "Bölümler",
                    url: "/department",
                    icon: BotIcon,
                },
                {
                    title: "Dersler",
                    url: "/lessonss",
                    icon: BookOpenIcon,
                },
                {
                    title: "Öğretmenler",
                    url: "/teachers",
                    icon: UsersIcon,
                },
                {
                    title: "Öğrenciler",
                    url: "/students",
                    icon: UsersIcon,
                },
                {
                    title: "Dönemler",
                    url: "/period",
                    icon: PercentDiamond,
                },
                {
                    title: "Ayarlar",
                    url: "/university-setting",
                    icon: SettingsIcon,
                },
                {
                    title: "Destek",
                    url: "/support",
                    icon: CircleHelpIcon,
                },
            ],
        }
    } else if (user?.role === UserRole.TEACHER) {
        return {
            navMain: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Dersler",
                    url: "/lessons",
                    icon: BookOpenIcon,
                },
                {
                    title: "Öğrenciler",
                    url: "/student",
                    icon: UsersIcon,
                },
                {
                    title: "Destek",
                    url: "/support",
                    icon: CircleHelpIcon,
                },
            ],
        }
    } else if (user?.role === UserRole.STUDENT) {
        return {
            navMain: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Dersler",
                    url: "/lesson",
                    icon: BookOpenIcon,
                },
                {
                    title: "Geçmişim",
                    url: "/score",
                    icon: UsersIcon,
                },
                {
                    title: "Destek",
                    url: "/support",
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
