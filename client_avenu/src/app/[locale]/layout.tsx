import React from "react";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
import { MainProvider } from "@/widgets/Contex/MainProvider";
import '../globals.css'


const locales = ['en', 'ru'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export default async function RootLayout({
  children,
  params: { locale },
  modal
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
  modal: React.ReactNode
}>) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="wrapper">
        <NextIntlClientProvider messages={messages}>
          <MainProvider>
            <Header />
            <main style={{ flexGrow: 1, display: 'flex' }}>
              <div id='root' style={{ flexGrow: 1, display: 'flex' }}>
                {modal}
                <div id="modal-portal"></div>
                {children}
              </div>
            </main>
          </MainProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

