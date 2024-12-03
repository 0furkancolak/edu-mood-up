"use client";
import React, { useCallback } from 'react'
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthContext } from '@/context/auth-provider';
import { Link, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { logoutMutationFn } from '@/lib/api';
import { LayoutDashboard, Loader } from 'lucide-react';

export default function UserProfile() {
  const { isLoading, user } = useAuthContext();
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      router.replace("/");
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
    <Popover>
      <PopoverTrigger>
        <Image
          alt=""
          src={user?.image || "/images/EduMoodUp.jpg"}
          width={40}
          height={40}
          className="rounded-full border-2 border-transparent hover:border-white transition-all duration-300"
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-52">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-zinc-600 font-semibold">Hi! {user?.name}</h2>
          <Button className='!py-1 h-8' variant="outline" onClick={() => router.push("/dashboard")}>
            <LayoutDashboard />
            Dashboard
          </Button>
          <Button className='!py-1 h-8' variant="outline" onClick={handleLogout} disabled={isPending}>
            {isPending && <Loader className="animate-spin" />}
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
