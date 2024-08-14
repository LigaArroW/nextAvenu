import { HomePageType } from "@/enums/homePageType";
import Home from "@/shared/components/Home/Home";
import { IModel } from "@/types/model/model/model";

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({params: {locale}}) {
  const t = await getTranslations({locale, namespace: 'navigation'});
  
  return {
        title: `${t("home")} | ${t("with_video")}`,
    };
}



export default async function WithVideoPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <Home type={HomePageType.WithVideo} />
    );
}

