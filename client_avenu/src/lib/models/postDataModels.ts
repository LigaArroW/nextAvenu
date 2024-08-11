'use server'
import { ModelFeedbackStatus } from "@/enums/modelFeedbackStatus";
import { PhotoStatus } from "@/enums/photoStatus";
import { VideoStatus } from "@/enums/videoStatus";
import { IModel } from "@/types/model/model/model";
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback";
import { IPhoto } from "@/types/model/photo/photo";
import { IVideo } from "@/types/model/video/video";
import { revalidatePath, revalidateTag } from "next/cache";




export async function updatePhotoStatus({ photo, status }: { photo: IPhoto; status: PhotoStatus }) {



    const response = await fetch('http://localhost:8001/api/update_photo_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                photo: photo,
                status: status,
            }
        }),

    })
    revalidateTag('ModelsPhotos')
    revalidateTag('Models')

    return await response.json()

}


export async function updateVideoStatus({ video, status }: { video: IVideo; status: VideoStatus }) {


    const response = await fetch('http://localhost:8001/api/update_video_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                video: video,
                status: status,
            }
        }),

    })
    revalidateTag('ModelsVideos')
    return await response.json()

}





export async function addModelFeedback({ model_feedback }: { model_feedback: IModelFeedback }) {

    const response = await fetch('http://localhost:8001/api/add_model_feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_feedback: model_feedback,
            }
        }),

    })
    revalidateTag('ModelsFeedbacks')
    revalidateTag('Models')
    return await response.json()

}
export async function updateModelFeedbacksView({ model_id }: { model_id: number }) {

    const response = await fetch('http://localhost:8001/api/update_model_feedbacks_view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_id: model_id,
            }
        }),

    })
    revalidateTag('ModelsFeedbacks')
    return await response.json()

}
export async function deleteModelFeedback({ feedback }: { feedback: IModelFeedback }) {

    const response = await fetch('http://localhost:8001/api/delete_model_feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                feedback: feedback,
            }
        }),

    })
    revalidateTag('ModelsFeedbacks')
    revalidateTag('Models')
    return await response.json()

}

export async function updateModelFeedbackStatus({ model_feedback, status }: { model_feedback: IModelFeedback; status: ModelFeedbackStatus }) {

    const response = await fetch('http://localhost:8001/api/update_model_feedback_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_feedback: model_feedback,
                status: status,
            }
        }),

    })
    revalidateTag('ModelsFeedbacks')
    return await response.json()

}
export async function updateModel({ model }: { model: IModel }) {

    const response = await fetch('http://localhost:8001/api/update_model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model: model,
            }
        }),

    })
    // revalidateTag('Models')
    revalidatePath(`/model/${model.id}`, 'page')
    return await response.json()

}
export async function addModel({ model }: { model: IModel }) {

    const response = await fetch('http://localhost:8001/api/add_model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model: model,
            }
        }),

    })
    revalidateTag('Models')
    revalidatePath(`/model/${model.id}`, 'page')
    return await response.json()

}
export async function deleteModel({ model }: { model: IModel }) {

    const response = await fetch('http://localhost:8001/api/delete_model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_id: model.id,
                photos: model.photos,
                videos: model.videos,
            }
        }),

    })
    revalidateTag('Models')
    revalidatePath(`/model/${model.id}`, 'page')
    return await response.json()

}
export async function updateModelEnable({ model_id, is_enable }: { model_id: number; is_enable: boolean }) {

    const response = await fetch('http://localhost:8001/api/update_model_enable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_id: model_id,
                is_enable: is_enable,
            }
        }),

    })
    revalidateTag('Models')
    return await response.json()

}
export async function updateModelEnableByModerator({ model_id, is_enable_by_moderator }: { model_id: number; is_enable_by_moderator: boolean }) {

    const response = await fetch('http://localhost:8001/api/update_model_enable_by_moderator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_id: model_id,
                is_enable_by_moderator: is_enable_by_moderator,
            }
        }),

    })
    revalidateTag('Models')
    return await response.json()

}
export async function updateModelCurrencyTimezone({ model_id, currency_id, time_zone }: { model_id: number; currency_id: number; time_zone: number }) {

    const response = await fetch('http://localhost:8001/api/update_model_currency_timezone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                model_id: model_id,
                currency_id: currency_id,
                time_zone: time_zone,
            }
        }),

    })
    revalidateTag('Models')
    return await response.json()

}

