'use server'
import { revalidateTag } from 'next/cache';

import { IWorkTime } from "@/types/model/workTime/workTime";




export async function addWorkTimes({ work_times, model_id }: { work_times: IWorkTime[]; model_id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/add_work_times', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                work_times: work_times,
                model_id: model_id,
            }
        }),
    })

    revalidateTag('Models')

    return await response.json()

}
