"use client";
import { usePathname } from '@/i18n/routing';
import { PROTECTED_ROUTES } from '@/lib/const';
import React, { useEffect, useState } from 'react'

export default function FooNavProvider({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(true);
    const path = usePathname();

    useEffect(() => {
        console.log(path.split("/")[1])
        if (PROTECTED_ROUTES.includes(path.split("/")[1]) && path.split("/")[1] !== "") {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [path]);

    if (!visible) {
        return <></>;
    }

    return (
        <>{children}</>
    )
}
