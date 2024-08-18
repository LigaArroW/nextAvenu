import React, { Suspense } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
import { MainProvider, useMainContext } from "@/widgets/Contex/MainProvider";
import '../globals.css'
import Script from "next/script";
import YandexMetrika from "@/shared/components/YandexMetrika/YandexMetrika";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const locales = ['en', 'ru'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export const metadata: Metadata = {
  title: "Главная страница | Все анкеты",
};

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
    <html lang={locale} className={montserrat.className}>
      <head>

      </head>
      <body className="wrapper">
        <Script id="metrika-counter" strategy="afterInteractive">
          {
            `(function (m, e, t, r, i, k, a) {
              m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
              m[i].l = 1 * new Date();
              for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
              k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
            ym(97878080, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              params: {
                'sameSite': 'None',
                'secure': true
              }
            })`
          }
        </Script>
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
        <GoogleAnalytics gaId="G-074Y6C99Q5" />
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

