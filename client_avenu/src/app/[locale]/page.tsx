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

  const model = await getModels()
 

  return (
    <Home type={HomePageType.AllModels} models={model} />
  );
}

const getModels = async () => {
  const response = await fetch('http://localhost:8001/api/models', {
    method: 'GET',
    next: { revalidate: 3600},
  });
  // console.log("🚀 ~ getModels ~ response:", response)

  return response.json();
}