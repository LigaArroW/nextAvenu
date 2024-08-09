
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import { getBlacklist, getBlacklistAccess } from "@/lib/blackList/blackList";
import MainProfile from "@/shared/components/Profile/MainProfile";
import BlackList from "@/shared/components/Profile/ui/BlackList/BlackList";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("profile.profile")} | ${t("profile.blacklist")}`,
    };
}

export default async function ProfilePage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Customer ? person : person.roles === RolesUsers.Agency ? person : undefined
    if (!user) {
        redirect(`/${locale}`)
    }
    const blacklist = await getBlacklist({ agency_id: Number(user._id) })
    console.log("🚀 ~ ProfilePage ~ blacklist:", blacklist.length)
    const blackListAccess = await getBlacklistAccess({ agency_id: Number(user._id) })

    return (
        // <div>asdasd</div>
        <BlackList person={user} blacklist={blacklist} blacklistAccess={blackListAccess} />
    )
}
