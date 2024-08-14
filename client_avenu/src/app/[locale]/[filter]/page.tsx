import { HomePageType } from "@/enums/homePageType";
import Home from "@/shared/components/Home/Home";
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {useTranslations} from 'next-intl';
interface PageProps {
  params: {
    filter: string;
    locale: string;
  };
}

// Функция для генерации метаданных
export async function generateMetadata({ params: { filter, locale } }: PageProps) {
  const t = await getTranslations({locale, namespace: 'navigation'});
  console.log('filter', filter)
  console.log('locale', locale)
  let titleKey;
  
  switch (filter) {
    case 'verified':
      titleKey = "verified";
      break;
    case 'new':
      titleKey = "new";
      break;
    default:
      titleKey = "home";
      break;
  }
  console.log(titleKey);
  return {
    title: `${t("home")} | ${t(titleKey)}`
  };
}

// Динамическая страница
export default function DynamicPage({ params: { filter, locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  
  let type;
  
  switch (filter) {
    case 'verified':
      type = HomePageType.Verified;
      break;
    case 'new':
      type = HomePageType.New;
      break;
    default:
      type = HomePageType.AllModels;
      break;
  }
  
  return <Home type={type} />;
}
