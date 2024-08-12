import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import styles from '@/shared/styles/ModelSettings.module.sass'


import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileNavigation from "@/shared/components/Profile/ui/ProfileNavigation/ProfileNavigation";
import { getModels } from "@/lib/models/getDataModel";
import ModelSettingsNavigation from "@/shared/components/ModelSettings/ui/ModelSettingsNavigation/ModelSettingsNavigation";



export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: ` ${t("profile.profile")} | ${t("profile.basic_information")}`,
    };
}


export default async function ModelSettingIdLayout({
    children,
    params: { locale, id }
}: {
    children: React.ReactNode,
    params: { locale: string, id: string[] }
}) {
    unstable_setRequestLocale(locale);
    const agencyToken = cookies().get('AgencyToken')?.value
    if (!agencyToken) {
        redirect(`/${locale}`)
    }

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Agency ? person : undefined

    if (!user) {
        redirect(`/${locale}`)
    }

    const isNew = id[1] === 'new'
    const modelId = isNew ? '' : id[1]



    return (
        <div className={styles.wrapper_content}>
            <ModelSettingsNavigation isNew={isNew} modelId={modelId} />
            {children}
        </div>
    )


}
