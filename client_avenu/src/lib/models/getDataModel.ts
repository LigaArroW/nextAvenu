'use server'

import { IPhoto } from "@/types/model/photo/photo"


export async function getModels({ profile_id }: { profile_id: number }) {
    const response = await fetch(`http://localhost:8001/api/models?profile_id=${profile_id}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            next: { tags: ['Models'] }
        }
    )
    return await response.json()

}
export async function getPhotos(): Promise<IPhoto[]> {
    const response = await fetch('http://localhost:8001/api/photos',
        {
            next: { tags: ['ModelsPhotos'] }
        }
    )
    return await response.json()

}

export async function getModelFeedbacks() {
    const response = await fetch('http://localhost:8001/api/model_feedbacks',
        {
            next: { tags: ['ModelsFeedbacks'] }
        }
    )
    return await response.json()
}

export async function getVideos() {
    const response = await fetch('http://localhost:8001/api/videos',
        {
            next: { tags: ['ModelsVideos'] }
        }
    )
    return await response.json()
}

export async function getModelsAdmin({ profile_id }: { profile_id: number }) {
    const response = await fetch(`http://localhost:8001/api/models?profile_id=${profile_id}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            next: { tags: ['ModelsAdmin'] }
        }
    )
    return await response.json()

}






