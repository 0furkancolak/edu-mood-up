"use client"
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CookieIcon } from 'lucide-react';

export default function CookieConsent() {
    const t = useTranslations('policies.cookieConsent');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-3 right-3 bg-gray-900 rounded-xl text-white p-4 shadow-lg z-50">
            <div className="container flex flex-col max-w-72 justify-between gap-4">
                <div className="flex items-center gap-2">
                    <CookieIcon size="20" />
                    <span className="text-sm">{t('title')}</span>
                </div>
                <div className="text-sm">
                    {t('message')}
                    <Link href="/privacy-policy" className="text-blue-400 ml-1 hover:text-blue-300 underline">
                        {t('learnMore')}
                    </Link>
                </div>
                <div className="flex flex-row-reverse gap-3">
                    <button
                        onClick={handleAccept}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                    >
                        {t('accept')}
                    </button>
                    <button
                        onClick={handleDecline}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-800 rounded-md transition-colors"
                    >
                        {t('decline')}
                    </button>
                </div>
            </div>
        </div>
    );
} 