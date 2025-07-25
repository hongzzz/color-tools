import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Color Tools",
  description: "A versatile suite of color tools for designers and developers.",
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { children, params } = props;
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans bg-zinc-50 text-zinc-900`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
