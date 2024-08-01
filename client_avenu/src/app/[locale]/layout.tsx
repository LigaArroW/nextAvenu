import React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
// import instance from "@/api/instance/instance";
import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
// import Footer from "@/shared/components/Footer/Footer";
// import ContactUsModal from "@/shared/components/Modals/ContactUsModal";
// import RegisterModal from "@/shared/components/Modals/RegisterModal";
// import LoginModal from "@/shared/components/Modals/LoginModal";

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
  // @ts-ignore
  // instance.defaults.headers.language = locale;

  return (
    <html lang={locale}>
      <body className="wrapper">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            <div id='root' >
              <div id="modal-portal"></div>
              {children}
            </div>
          </main>
          <Footer />
          {modal}
          {/* <ContactUsModal /> */}
          {/* <RegisterModal /> */}
          {/* <LoginModal /> */}
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

