
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import MainProfile from "@/shared/components/Profile/MainProfile";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: ` ${t("profile.profile")} | ${t("profile.basic_information")}`,
    };
}

export default async function MainProfilePage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Customer ? person : person.roles === RolesUsers.Agency ? person : undefined
    if(!user) {
        redirect(`/${locale}`)
    }

    return (
        <MainProfile person={user}/>
    )
}
