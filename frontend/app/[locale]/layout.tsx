import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import QueryProvider from "@/context/query-provider";
import { AuthProvider } from "@/context/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduMoodUp - Next Generation Education",
  description: "EduMoodUp - Next Generation Education Platform for everyone",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </AuthProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
