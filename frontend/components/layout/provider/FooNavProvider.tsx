"use client";
import { usePathname } from '@/i18n/routing';
import React, { useEffect, useState } from 'react'

export default function FooNavProvider({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(true);
    const path = usePathname();

    useEffect(() => {
        if (path.split("/")[1] == "dashboard") {
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
