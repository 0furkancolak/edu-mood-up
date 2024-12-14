"use client"
import * as React from "react"
import { Link, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface LinkTabsProps {
  defaultValue?: string
  className?: string
  children?: React.ReactNode
}

interface LinkTabsListProps {
  className?: string
  children?: React.ReactNode
}

interface LinkTabsTriggerProps {
  value: string
  href: string
  className?: string
  children?: React.ReactNode
}

const LinkTabs = React.forwardRef<
  HTMLDivElement,
  LinkTabsProps
>(({ className, children, ...props }, ref) => {
  const pathname = usePathname()
  const hasActiveTab = React.Children.toArray(children).some(child => {
    if (React.isValidElement(child)) {
      const list = child as React.ReactElement<LinkTabsListProps>;
      return React.Children.toArray(list.props.children).some(
        tab => React.isValidElement(tab) && (tab as React.ReactElement<LinkTabsTriggerProps>).props.href === pathname
      )
    }
    return false
  })

  if (!hasActiveTab) return null

  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
})
LinkTabs.displayName = "LinkTabs"

const LinkTabsList = React.forwardRef<
  HTMLDivElement,
  LinkTabsListProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-9 gap-1 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
LinkTabsList.displayName = "LinkTabsList"

const LinkTabsTrigger = React.forwardRef<
  HTMLAnchorElement,
  LinkTabsTriggerProps
>(({ className, href, value, children, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-background text-foreground shadow",
        !isActive && "hover:bg-black/5",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
})
LinkTabsTrigger.displayName = "LinkTabsTrigger"

export { LinkTabs, LinkTabsList, LinkTabsTrigger } 