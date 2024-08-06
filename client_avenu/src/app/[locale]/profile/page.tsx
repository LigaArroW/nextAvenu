import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function ProfilePage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const customerToken = cookies().get('CustomerToken')?.value
    const agencyToken = cookies().get('AgencyToken')?.value
    if (!customerToken && !agencyToken) {
        redirect(`/${locale}/login`)
    }


    return (
        <div>Страница профиля</div>
    )
}
