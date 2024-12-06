"use client";
import React, { useCallback } from 'react'
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthContext } from '@/context/auth-provider';
import { Link, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { logoutMutationFn } from '@/lib/api';
import { LayoutDashboard, Loader, LogOut } from 'lucide-react';

export default function UserProfile() {
  const { isLoading, user } = useAuthContext();
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = useCallback(() => {
    mutate();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <Image
          alt=""
          src={user?.image || "/images/EduMoodUp.jpg"}
          width={40}
          height={40}
          className="rounded-full border-2 border-transparent hover:border-white transition-all duration-300"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="flex flex-col gap-2 p-2 w-full">
          <h2 className="text-xs text-gray-600 font-semibold">Hi! {user?.name}</h2>
          <DropdownMenuItem onClick={() => router.push("/dashboard")} className="flex items-center gap-2 cursor-pointer w-full">
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer w-full" disabled={isPending}>
            <LogOut />
            Logout
            {isPending && <Loader className="animate-spin" />}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
