
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import { getBlacklist } from "@/lib/blackList/blackList";
import { getCities } from "@/lib/cities/citiesAction";
import { getCountries } from "@/lib/countries/countriesAction";
import MainProfile from "@/shared/components/Profile/MainProfile";
import AddBlackList from "@/shared/components/Profile/ui/BlackList/AddBlackList/AddBlackList";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("profile.profile")} | ${t("profile.add_to_blacklist")}`,
    };
}

export default async function ProfileAddToBlackListPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Customer ? person : person.roles === RolesUsers.Agency ? person : undefined
    if (!user) {
        redirect(`/${locale}`)
    }


    const cities = await getCities()
    const countries = await getCountries()
    const blacklist = await getBlacklist({ agency_id: Number(user._id) })


    return (
       
        <AddBlackList person={user} blacklist={blacklist} cities={cities} countries={countries} />
    )
}
