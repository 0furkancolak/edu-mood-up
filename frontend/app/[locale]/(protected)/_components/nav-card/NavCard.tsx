import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

export default function NavCard({ title, Icon, count, percentage, className }: { title: string, Icon: React.ElementType, count: string, percentage: number, className?: string }) {
    return (
        <Card className={cn("relative overflow-clip", className)} x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon && <Icon className="size-20 absolute -bottom-5 -right-5 text-muted" />}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">
                    +{percentage}% geçen aydan
                </p>
            </CardContent>
        </Card>
    )
}
