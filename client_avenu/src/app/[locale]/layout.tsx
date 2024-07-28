import React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import instance from "@/api/instance/instance";
import Header from "@/shared/components/Header/Header";
// import Footer from "@/shared/components/Footer/Footer";
// import ContactUsModal from "@/shared/components/Modals/ContactUsModal";
// import RegisterModal from "@/shared/components/Modals/RegisterModal";
// import LoginModal from "@/shared/components/Modals/LoginModal";

export const metadata: Metadata = {
  title: "Главная страница | Все анкеты",
};

export default async function RootLayout({
  children, params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  // @ts-ignore
  // instance.defaults.headers.language = locale;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            <div id='root'>
              <div id="modal-portal"></div>
              {children}
            </div>
          </main>
          {/* <ContactUsModal /> */}
          {/* <RegisterModal /> */}
          {/* <LoginModal /> */}
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

