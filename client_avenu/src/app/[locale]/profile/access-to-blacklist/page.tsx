
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import { getBlacklist, getBlacklistAccess } from "@/lib/blackList/blackList";
import MainProfile from "@/shared/components/Profile/MainProfile";
import AccessToBlackList from "@/shared/components/Profile/ui/BlackList/AccessToBlackList/AccessToBlackList";
import BlackList from "@/shared/components/Profile/ui/BlackList/BlackList";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("profile.profile")} | ${t("profile.access_to_the_blacklist")}`,
    };
}

export default async function ProfileAccessToBlackListPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Customer ? person : person.roles === RolesUsers.Agency ? person : undefined
    if (!user) {
        redirect(`/${locale}`)
    }


    return (

        <AccessToBlackList person={user} />
    )
}
