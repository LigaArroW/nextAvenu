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

// export default async function updateModel(tmpModel: IModel) {
//     try {
//         await fetch('http://localhost:8001/api/update_model', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//                 params: {
//                     model: tmpModel
//                 }
//             })
//         }).then((res) => res.json())
//         revalidateTag('models')
//         // revalidateTag('modelsPage')
//         revalidatePath('/model/[id]/page', 'page')
//         return {
//             success: true
//         }
//     } catch (error) {
//         console.log('🚀 ~ updateAboutData ~ error:', error);
//     }
// }