
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import Portal from "@/shared/components/ModalPortal/ModalPortal";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";


export default async function ProposalPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations();

    const person = await getAuthDataUserAction()
    // console.log("🚀 ~ ProposalPage ~ person:", person)

    return (
        <div>Страница предложения</div>
    )
}