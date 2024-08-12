
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import { getModels } from "@/lib/models/getDataModel";
import { getProposals, getProposalViews } from "@/lib/proposal/proposalAction";
import { getPositionsUp } from "@/lib/verification/verificationAction";
import Advertisements from "@/shared/components/Profile/ui/Advertisements/Advertisements";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("profile.profile")} | ${t("global.advertisements")}`,
    };
}

export default async function ProfileAdvertisementsPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Agency ? person : undefined
    if (!user) {
        redirect(`/${locale}`)
    }



    
    const models = await getModels()
    const { data } = await getPositionsUp({ agency_id: Number(user._id) })
    const proposals = await getProposals()
    const proposalViews = await getProposalViews()

    return (
        <Advertisements person={user} models={models} positionsUp={data} proposals={proposals} proposalViews={proposalViews}/>
    )
}
