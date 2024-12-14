"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    Column,
} from "@tanstack/react-table"
import { ChevronDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterColumn?: string
    filterPlaceholder?: string
}

function getUniqueValues<TData>(rows: TData[], accessor: string): string[] {
    const uniqueValues = new Set<string>()
    rows.forEach((row: any) => {
        const value = row[accessor]
        if (value !== undefined && value !== null) {
            uniqueValues.add(String(value))
        }
    })
    return Array.from(uniqueValues).sort()
}

function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    table,
}: {
    column: Column<TData, TValue>
    title: React.ReactNode
    table: any
}) {
    const uniqueValues = getUniqueValues(table.options.data, column.id)
    const filterValue = column.getFilterValue() as string

    return (
        <div className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="-ml-3 h-8">
                        <span>{title}</span>
                        {filterValue ? (
                            <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                                1
                            </Badge>
                        ) : null}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <div className="flex items-center px-2 py-1.5">
                        <Input
                            placeholder={`${title} ara...`}
                            value={(column.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                column.setFilterValue(event.target.value)
                            }
                            className="h-8 w-full"
                        />
                        {filterValue && (
                            <X
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={() => column.setFilterValue("")}
                            />
                        )}
                    </div>
                    <DropdownMenuSeparator />
                    {uniqueValues.length > 0 && (
                        <>
                            {uniqueValues.map((value) => (
                                <DropdownMenuItem
                                    key={value}
                                    className="flex items-center"
                                    onSelect={() => column.setFilterValue(value)}
                                >
                                    {value}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem
                        className="flex items-center"
                        onSelect={() => column.toggleSorting(false)}
                    >
                        ↑ Artan sıralama
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center"
                        onSelect={() => column.toggleSorting(true)}
                    >
                        ↓ Azalan sıralama
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function DataTablePagination<TData>({ table }: { table: any }) {
    const totalPages = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex + 1

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 3
        const ellipsisThreshold = 5

        if (totalPages <= ellipsisThreshold) {
            // Show all pages if total pages is less than threshold
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage <= 3) {
                // Near the start
                pages.push(2, 3)
                pages.push("ellipsis")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push("ellipsis")
                pages.push(totalPages - 2, totalPages - 1, totalPages)
            } else {
                // Middle
                pages.push("ellipsis")
                pages.push(currentPage - 1, currentPage, currentPage + 1)
                pages.push("ellipsis")
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => table.previousPage()}
                        className={cn(
                            "cursor-pointer",
                            !table.getCanPreviousPage() && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>

                {pageNumbers.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                onClick={() => table.setPageIndex((page as number) - 1)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => table.nextPage()}
                        className={cn(
                            "cursor-pointer",
                            !table.getCanNextPage() && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterColumn,
    filterPlaceholder,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Tüm kolonlarda ara..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                {filterColumn && (
                    <Input
                        placeholder={filterPlaceholder || "Filter..."}
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Kolonlar <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                header.column.getCanFilter() ? (
                                                    <DataTableColumnHeader
                                                        column={header.column}
                                                        title={flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        table={table}
                                                    />
                                                ) : (
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                )
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Sonuç bulunamadı.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} / {" "}
                    {table.getFilteredRowModel().rows.length} satır seçildi.
                </div>
                <div>
                    <DataTablePagination table={table} />
                </div>
            </div>
        </div>
    )
} 