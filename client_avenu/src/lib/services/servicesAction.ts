'use server'

import { IModelService } from "@/types/model/modelService/modelService";
import { ITarif } from "@/types/model/tarif/tarif";
import { revalidateTag } from "next/cache";





export async function addModelServices({ model_services, model_id }: { model_services: IModelService[]; model_id: number }) {

    const response = await fetch('http://localhost:8001/api/add_model_services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_services: model_services,
                model_id: model_id,
            }
        }),

    })

    revalidateTag('Models')
    return await response.json()

}