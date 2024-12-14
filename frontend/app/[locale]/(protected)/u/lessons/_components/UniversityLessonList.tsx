"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"
import { BookOpen, Clock, GraduationCap, School2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Lesson {
    id: number
    code: string
    name: string
    faculty: string
    department: string
    teacher: string
    students: number
    schedule: string
    status: "active" | "inactive" | "completed"
}

const columns: ColumnDef<Lesson | any>[] = [
    {
        accessorKey: "name",
        header: "Ders",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: "code",
        header: "Ders Kodu",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: "faculty",
        header: "Fakülte",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: "department",
        header: "Bölüm",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: "teacher",
        header: "Öğretmen",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
            const teacher = row.getValue("teacher") as string
            return (
                <div className="flex items-center gap-2">
                    <School2 className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "schedule",
        header: "Program",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
            const schedule = row.getValue("schedule") as string
            return (
                <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{schedule}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "students",
        header: "Öğrenci Sayısı",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
            const students = row.getValue("students") as number
            return (
                <div className="flex items-center justify-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{students}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Durum",
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <div className="flex justify-center">
                    {status === "active" && (
                        <Badge className="bg-green-500">Aktif</Badge>
                    )}
                    {status === "inactive" && (
                        <Badge variant="secondary">Pasif</Badge>
                    )}
                    {status === "completed" && (
                        <Badge variant="outline">Tamamlandı</Badge>
                    )}
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const lesson = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(lesson.code)}
                        >
                            Ders kodunu kopyala
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ders detayları</DropdownMenuItem>
                        <DropdownMenuItem>Öğrenci listesi</DropdownMenuItem>
                        <DropdownMenuItem>Program detayları</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function UniversityLessonList({ lessons }: { lessons: Lesson[] | any }) {
    return (
        <DataTable
            columns={columns}
            data={lessons}
        />
    )
} 