import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { getModel, getModelOne, getModels } from "@/lib/models/getDataModel";
import { getFiltredFields } from "@/lib/models/getModelsFilter";
import Model from "@/shared/components/Model/Model";
import { IGeneral } from "@/types/core/generalFilters";
import { IModel } from "@/types/model/model/model";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";




// export const dynamic = 'force-dynamic'


export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
    const model = await getModelOne(id)
    return {
        title: `${model?.name} (${model?.age})` || "Модель не найдена",
        // title: `${t("navigation.home")} | ${t("navigation.all_models")}`,
    };
}




export async function generateStaticParams() {


    const models = await getModels();


    return models.map((model: IModel) => ({
        key: model.id,
        id: String(model.id),
        // id: String(model.id).padStart(8, "0"),
    }))


}




export default async function ModelIdPage({ params: { id, locale } }: { params: { id: string, locale: string } }) {
    unstable_setRequestLocale(locale);


    const person = await getAuthDataUserAction()

    // const user = person.roles === RolesUsers.Customer ? person : person.roles === RolesUsers.Agency ? person : undefined

    const filtredFields: Partial<IGeneral> = await getFiltredFields()

    const model = await getModelOne(id)

    if (!model) {
        return redirect(`/${locale}`)
    }
    // console.log(filtredFields.service_categories);


    return (
        <Model filtredFields={filtredFields} model={model} forModerator={false} person={person} />

    )
}


