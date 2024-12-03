import React from "react";
import { useTranslations } from "next-intl";

export default function TermsOfService() {
    const t = useTranslations('terms');

    return (
        <div className="p-6 pt-32 bg-green-700 text-white">
            <section className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('introduction.title')}</h2>
                    <p>{t('introduction.content')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('account.title')}</h2>
                    <p>{t('account.content')}</p>
                    <ul className="list-disc list-inside ml-5">
                        <li>{t('account.rules.accurate')}</li>
                        <li>{t('account.rules.security')}</li>
                        <li>{t('account.rules.privacy')}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('usage.title')}</h2>
                    <p>{t('usage.content')}</p>
                    <ul className="list-disc list-inside ml-5">
                        <li>{t('usage.rules.legal')}</li>
                        <li>{t('usage.rules.respect')}</li>
                        <li>{t('usage.rules.security')}</li>
                        <li>{t('usage.rules.spam')}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('content.title')}</h2>
                    <p>{t('content.content')}</p>
                    <ul className="list-disc list-inside ml-5">
                        <li>{t('content.rules.copyright')}</li>
                        <li>{t('content.rules.harmful')}</li>
                        <li>{t('content.rules.misleading')}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('changes.title')}</h2>
                    <p>{t('changes.content')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('disclaimer.title')}</h2>
                    <p>{t('disclaimer.content')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
                    <p>
                        {t('contact.content')}
                    </p>
                </section>
            </section>
        </div>
    );
}
