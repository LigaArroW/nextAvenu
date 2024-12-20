import { HomePageType } from "@/enums/homePageType";
import Home from "@/shared/components/Home/Home";
import { IModel } from "@/types/model/model/model";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: `${t("navigation.home")} | ${t("navigation.all_models")}`,
  };
}


export default async function StorePage() {

  return (
    <Home type={HomePageType.AllModels}  />
  );
}

