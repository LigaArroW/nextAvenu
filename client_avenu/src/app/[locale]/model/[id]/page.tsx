import { getAuthDataUserAction } from "@/lib/auth/authAction";
import { getModel, getModelOne, getModels } from "@/lib/models/getDataModel";
import { getFiltredFields } from "@/lib/models/getModelsFilter";
import Model from "@/shared/components/Model/Model";
import { filtredFields } from "@/shared/constant/filtredFields";
import { IGeneral } from "@/types/core/generalFilters";
import { IModel } from "@/types/model/model/model";
import { unstable_setRequestLocale } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { NextRequest } from "next/server";



// export const dynamic = 'force-dynamic'


export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
    const model = await getModelOne(id)
    return {
        title: `${model?.name} (${model?.age})` || "Модель не найдена",
        // title: `${t("navigation.home")} | ${t("navigation.all_models")}`,
    };
}




export async function generateStaticParams() {

    // const models = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/models', {
    //     method: 'GET',
    //     next: { revalidate: 10 },
    // }).then((res) => res.json());

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


interface FiltredFields {
    [key: string]: [];
}

// const getModel = async (id: string) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models`, {
//         // next: { tags: ['modelsPage'] },
//         // next: { revalidate: 5 }
//         cache: 'no-store'
//     })
//     if (!response.ok) {
//         throw new Error(`Failed to fetch models: ${response.status}`);
//     }
//     const models: IModel[] = await response.json();

//     const model: IModel | undefined = models.find((model: IModel) => model.id === Number(id));
//     if (!model) {
//         throw new Error(`Model with id ${id} not found`);
//     }
//     return model;
// }


// const getFiltredFields = async (): Promise<FiltredFields> => {
//     const responseJsons: FiltredFields = {};

//     await Promise.all(
//         filtredFields.map(async (field) => {

//             const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/${field}`, {
//                 method: 'GET',
//                 cache: 'force-cache',
//             });
//             const json = await response.json();

//             responseJsons[field] = json;
//         })
//     );

//     return responseJsons;
// };
