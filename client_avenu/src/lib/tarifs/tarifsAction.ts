'use server'

import { ITarif } from "@/types/model/tarif/tarif";
import { revalidateTag } from "next/cache";





export async function addTarifs({ tarifs, model_id }: { tarifs: ITarif[]; model_id: number }) {



    const response = await fetch('http://localhost:8001/api/add_tarifs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                tarifs: tarifs,
                model_id: model_id,
            }
        }),

    })

    revalidateTag('Models')
    return await response.json()

}