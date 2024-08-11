'use server'

import { IPhoto } from "@/types/model/photo/photo";
import { revalidateTag } from "next/cache";

export async function deletePhoto({ photo }: { photo: IPhoto }) {
    const response = await fetch('http://localhost:8001/api/delete_photo',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                params: {
                    photo: photo
                }
            }
            ),

        }
    )
    revalidateTag('photos')
    return await response.json()

}
export async function updateMainPhoto({ model_id, photo_id }: { model_id: number; photo_id: number }) {
    const response = await fetch('http://localhost:8001/api/update_main_photo',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                params: {
                    model_id: model_id,
                    photo_id: photo_id,
                }
            }
            ),

        }
    )
    
    revalidateTag('photos')
    return await response.json()

}
