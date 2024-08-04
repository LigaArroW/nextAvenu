'use client'

import { ModelFeedbackStatus } from "@/enums/modelFeedbackStatus"
import { updateModelFeedbackStatus } from "@/lib/models/postDataModels"
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback"


interface IButtonLogOutProps {
    text: string
    style?: string
    status: ModelFeedbackStatus
    model_feedback: IModelFeedback

}

const ButtonUpdateStatusFeedback: React.FC<IButtonLogOutProps> = ({ text, model_feedback, status, style = '' }) => {

    return (
        <button className={style} onClick={() => updateModelFeedbackStatus({ status, model_feedback })}>
            {text}
        </button>
    )
}

export default ButtonUpdateStatusFeedback