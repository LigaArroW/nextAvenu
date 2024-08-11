
import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import { getModelOne, getModels } from "@/lib/models/getDataModel";
import { getFiltredFields } from "@/lib/models/getModelsFilter";
import { getProposals, getProposalViews } from "@/lib/proposal/proposalAction";
import { getPositionsUp } from "@/lib/verification/verificationAction";
import ModelSettingsNew from "@/shared/components/ModelSettings/ui/Parameters/ModelSettingsNew";
import { NewModelProvider } from "@/shared/components/ModelSettings/ui/Context/NewModel/NewModelProvider";
import LinksList from "@/shared/components/ModelSettings/ui/ModelSettingsNavigation/linksList";
import Advertisements from "@/shared/components/Profile/ui/Advertisements/Advertisements";
import { IModel } from "@/types/model/model/model";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import ModelSettingPhotos from "@/shared/components/ModelSettings/ui/ModelSettingPhotos/ModelSettingPhotos";
import { Metadata, ResolvingMetadata } from "next";
import ModelSettingVideo from "@/shared/components/ModelSettings/ui/ModelSettingVideo/ModelSettingVideo";
import ModelSettingTarifs from "@/shared/components/ModelSettings/ui/ModelSettingTarifs/ModelSettingTarifs";
import { ITarif } from "@/types/model/tarif/tarif";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { IWorkDuration } from "@/types/core/workDuration";
import { IWorkTime } from "@/types/model/workTime/workTime";
import { IDayOfWeek } from "@/types/core/dayOfWeek";
import ModelSettingServices from "@/shared/components/ModelSettings/ui/ModelSettingServices/ModelSettingServices";
import ModelSettingStatistics from "@/shared/components/ModelSettings/ui/ModelSettingStatistics/ModelSettingStatistics";
import ModelSettingFeedbacks from "@/shared/components/ModelSettings/ui/ModelSettingFeedbacks/ModelSettingFeedbacks";
import ModelSettingOrders from "@/shared/components/ModelSettings/ui/ModelSettingOrders/ModelSettingOrders";

type Props = {
    params: { id: string[], locale: string }
}


export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const t = await getTranslations();

    return {
        // title: `${t("profile.profile")} | ${t("global.advertisements")}`,
        title: `${t("profile.profile")} | ${t(`model.${params.id[0]}`)}`,
    };
}

export default async function ModelSettingsPage({ params: { locale, id } }: { params: { locale: string, id: string[] } }) {
    unstable_setRequestLocale(locale);

    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Agency ? person : undefined
    if (!user) {
        redirect(`/${locale}`)
    }
    const isNew = id[1] === 'new'
    const modelId = isNew ? '' : id[1]
    let model: IModel | undefined = undefined
    if (!isNew) {
        model = await getModelOne(modelId)
        if (!model) {
            redirect(`/${locale}/profile`)
        }
        const access = model.agency_id === Number(user._id)
        if (!access) {
            redirect(`/${locale}/profile`)
        }
    }
    if (!model && !isNew) {
        redirect(`/${locale}/profile`)
    }
    const links = LinksList.map(link => link.link_url.split('/')[3])
    if (!links.includes(id[0])) {
        redirect(`/${locale}/profile`)
    }


    const filters = await getFiltredFields()
    const proposals = await getProposals()


    return (
        <>
            <NewModelProvider initialModel={model}>

                {id[0] === 'parameters' && <ModelSettingsNew person={user} filters={filters} isNew={isNew} />}

                {id[0] === 'photos' && <ModelSettingPhotos person={user} />}
                {id[0] === 'videos' && <ModelSettingVideo person={user} />}
                {id[0] === 'tariffs' && <ModelSettingTarifs person={user} filters={filters} />}
                {id[0] === 'services' && <ModelSettingServices person={user} filters={filters} />}
                {id[0] === 'statistics' && <ModelSettingStatistics person={user} filters={filters} />}
                {id[0] === 'feedbacks' && <ModelSettingFeedbacks person={user} />}
                {id[0] === 'orders' && <ModelSettingOrders proposals={proposals} />}

            </NewModelProvider>


        </>
    )
}
