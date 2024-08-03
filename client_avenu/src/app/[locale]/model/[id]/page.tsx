import Model from "@/shared/components/Model/Model";
import { filtredFields } from "@/shared/constant/filtredFields";
import { IGeneral } from "@/types/core/generalFilters";
import { IModel } from "@/types/model/model/model";
import { unstable_setRequestLocale } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";



export const dynamic = 'force-dynamic'

export async function generateStaticParams() {

    const models = await fetch('http://localhost:8001/api/models', {
        method: 'GET',
        next: { revalidate: 10 },
    }).then((res) => res.json());

    return models.map((model: IModel) => ({
        id: String(model.id),
        // id: String(model.id).padStart(8, "0"),
    }))


}




export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
    const model = await getModel(id)
    return {
        title: `${model.name} (${model.age})` || "Модель не найдена",
        // title: `${t("navigation.home")} | ${t("navigation.all_models")}`,
    };
}




export default async function ModelPage({ params: { id, locale } }: { params: { id: string, locale: string } }) {
    unstable_setRequestLocale(locale);

    const filtredFields: Partial<IGeneral> = await getFiltredFields()

    const model = await getModel(id)

    // console.log(filtredFields.service_categories);


    return (
        <Model filtredFields={filtredFields} model={model} forModerator={false} />

    )
}


interface FiltredFields {
    [key: string]: [];
}

const getModel = async (id: string) => {
    const response = await fetch(`http://localhost:8001/api/models`, {
        // next: { tags: ['modelsPage'] },
        // next: { revalidate: 5 }
        cache: 'no-store'
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
    }
    const models: IModel[] = await response.json();

    const model: IModel | undefined = models.find((model: IModel) => model.id === Number(id));
    if (!model) {
        throw new Error(`Model with id ${id} not found`);
    }
    return model;
}


const getFiltredFields = async (): Promise<FiltredFields> => {
    const responseJsons: FiltredFields = {};

    await Promise.all(
        filtredFields.map(async (field) => {

            const response = await fetch(`http://localhost:8001/api/${field}`, {
                method: 'GET',
                cache: 'force-cache',
            });
            const json = await response.json();

            responseJsons[field] = json;
        })
    );

    return responseJsons;
};