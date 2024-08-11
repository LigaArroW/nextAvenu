'use server'

import { IVideo } from "@/types/model/video/video";
import { revalidateTag } from "next/cache";





export async function getVideos() {
    const response = await fetch('http://localhost:8001/api/videos',
        {
            next: { tags: ['videos'] }
        }
    )

    return await response.json()

}
export async function deleteVideo({ video }: { video: IVideo }) {
    const response = await fetch('http://localhost:8001/api/delete_video',
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

