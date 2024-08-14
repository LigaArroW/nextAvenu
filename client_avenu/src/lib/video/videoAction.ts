'use server'

import { IVideo } from "@/types/model/video/video";
import { revalidateTag } from "next/cache";





export async function getVideos() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/videos',
        {
            next: { tags: ['videos'] }
        }
    )

    return await response.json()

}
export async function deleteVideo({ video }: { video: IVideo }) {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/delete_video',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                params: {
                    video: video,
                }
            }
            ),

        }
    )
    revalidateTag('videos')
    return await response.json()

}

