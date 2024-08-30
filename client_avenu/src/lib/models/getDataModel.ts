'use server'

import { IModel } from "@/types/model/model/model"
import { IPhoto } from "@/types/model/photo/photo"


export async function getModels(profile_id: string | undefined = undefined) {

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models${profile_id !== undefined && profile_id !== '' ? `?profile_id=${profile_id}` : ''}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            next: { tags: ['Models'], revalidate: 5 },
           
            // cache: 'no-store'
        }
    )
    return await response.json()

}
export async function getModel({ profile_id }: { profile_id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models_agency?profile_id=${profile_id}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            next: { tags: ['Models'] }
        }
    )
    return await response.json()

}



export const getModelOne = async (id: string) => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models`, {
    //     next: { tags: ['modelsPage'] },
    //     // next: { revalidate: 5 }
    //     // cache: 'no-store'
    // })
    try {
        const models: IModel[] = await getModels()

        const model: IModel | undefined = models.find((model: IModel) => model.id === Number(id));
        if (!model) {
            throw new Error(`Model with id ${id} not found`);
        }
        return model;
    } catch (error) {
        console.error(error);
    }

}


export async function getPhotos(): Promise<IPhoto[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/photos',
        {
            next: { tags: ['ModelsPhotos'] }
        }
    )
    return await response.json()

}

export async function getModelFeedbacks() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/model_feedbacks',
        {
            next: { tags: ['ModelsFeedbacks'] }
        }
    )
    return await response.json()
}

export async function getVideos() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/videos',
        {
            next: { tags: ['ModelsVideos'] }
        }
    )
    return await response.json()
}

export async function getModelsAdmin({ profile_id }: { profile_id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models?profile_id=${profile_id}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            next: { tags: ['ModelsAdmin', 'Models'] }
        }
    )
    return await response.json()

}
export async function getModelsAgency({ profile_id }: { profile_id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models?profile_id=${profile_id}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            next: { tags: ['ModelsAdmin', 'Models'] }
        }
    )
    return await response.json()

}






