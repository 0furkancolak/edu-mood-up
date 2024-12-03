import React from "react";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
    const t = useTranslations('privacy');

    return (
        <div className="container p-6 pt-32 bg-green-700 text-white">
            <section className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('introduction.title')}</h2>
                    <p>
                        {t('introduction.content')}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('collectedInformation.title')}</h2>
                    <p>
                        {t('collectedInformation.content')}
                    </p>
                    <ul className="list-disc list-inside ml-5">
                        <li>{t('collectedInformation.items.personalInformation')}</li>
                        <li>{t('collectedInformation.items.browser')}</li>
                        <li>{t('collectedInformation.items.usageData')}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('usedInformation.title')}</h2>
                    <p>
                        {t('usedInformation.content')}
                    </p>
                    <ul className="list-disc list-inside ml-5">
                        <li>{t('usedInformation.items.provideServices')}</li>
                        <li>{t('usedInformation.items.improveExperience')}</li>
                        <li>{t('usedInformation.items.contact')}</li>
                        <li>{t('usedInformation.items.marketing')}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('sharedInformation.title')}</h2>
                    <p>
                        {t('sharedInformation.content')}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('dataSecurity.title')}</h2>
                    <p>
                        {t('dataSecurity.content')}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('cookies.title')}</h2>
                    <p>
                        {t('cookies.content')}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('changes.title')}</h2>
                    <p>
                        {t('changes.content')}
                    </p>
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
