import { HomePageType } from "@/enums/homePageType";
import Home from "@/shared/components/Home/Home";
import { IModel } from "@/types/model/model/model";

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: `${t("navigation.home")} | ${t("navigation.all_models")}`,
  };
}



export default async function StorePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <Home type={HomePageType.AllModels} />
  );
}

