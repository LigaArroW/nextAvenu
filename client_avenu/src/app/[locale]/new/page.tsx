import { HomePageType } from "@/enums/homePageType";
import Home from "@/shared/components/Home/Home";
import { IModel } from "@/types/model/model/model";

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
    
    return {
        title: `qwdqwd`,
    };
}



export default async function NewPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <Home type={HomePageType.New} />
    );
}

