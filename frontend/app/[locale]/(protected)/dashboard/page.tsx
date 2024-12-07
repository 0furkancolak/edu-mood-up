import { getUser } from '@/lib/auth';
import { UserRole } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const user = await getUser();

    if (!user) {
        return redirect("/login");
    }

    if (user.role === UserRole.STUDENT) {
        return redirect("/s/dashboard");
    } else if (user.role === UserRole.TEACHER) {
        return redirect("/t/dashboard");
    } else if (user.role === UserRole.UNIVERSITY) {
        return redirect("/u/dashboard");
    }

    return (
        <div>Loading...</div>
    )
}
