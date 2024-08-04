'use client'

import { PhotoStatus } from "@/enums/photoStatus"
import { updatePhotoStatus } from "@/lib/models/postDataModels"
import { IPhoto } from "@/types/model/photo/photo"


interface IButtonLogOutProps {
    text: string
    style?: string
    status: PhotoStatus
    photo: IPhoto

}

const ButtonUpdateStatus: React.FC<IButtonLogOutProps> = ({ text, photo, status, style = '' }) => {

    return (
        <button className={style} onClick={() => updatePhotoStatus({ status, photo })}>
            {text}
        </button>
    )
}

export default ButtonUpdateStatus