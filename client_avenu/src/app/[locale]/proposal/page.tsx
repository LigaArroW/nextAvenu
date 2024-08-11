
import { getAuthUserAction } from "@/lib/auth/authAction";
import { getProposalPlaces } from "@/lib/proposal/proposalAction";
import Proposal from "@/shared/components/Proposal/Proposal";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";


export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("global.make_an_order")}`,
    };
}

export default async function ProposalPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations();

    const person = await getAuthUserAction('CustomerToken')

    const proposalPlaces = await getProposalPlaces()

    return (
        <Proposal person={person} proposalPlaces={proposalPlaces}/>
    )
}