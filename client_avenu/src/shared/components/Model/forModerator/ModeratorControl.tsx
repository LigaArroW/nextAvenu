'use client'


import { IModel } from "@/types/model/model/model"
import styles from '@/shared/styles/Model.module.sass'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateModel } from "@/lib/models/postDataModels"



interface IModeratorControl {
    forModerator: boolean
    // isModelEnable: boolean
    model: IModel
}

const ModeratorControl: React.FC<IModeratorControl> = ({ forModerator = false, model }) => {
    const [isModelEnable, setIsModelEnable] = useState(model.is_enable_by_moderator);
    const router = useRouter()

    // const isModelEnable = model.is_enable;

    const handleClick = async (enable: boolean) => {
        // const tempModel = { ...model, is_enable_by_moderator: enable }

        // const res = await updateModel({ ...model, is_enable_by_moderator: enable })
        updateModel({ model: { ...model, is_enable_by_moderator: enable } })
        // if (res?.success) {
        setIsModelEnable(enable);
        // }

    }




    return (
        <>
            {forModerator ? <div className={styles.moderator_control}>
                <div className={styles.toggle_wrapper}>
                    <div
                        className={`${styles.toggle} ${!!isModelEnable ? styles.active : ""}`}
                        onClick={() => handleClick(true)}
                    >
                        Включить
                    </div>
                    <div
                        className={`${styles.toggle} ${!isModelEnable ? styles.active : ""}`}
                        onClick={() => handleClick(false)}
                    >
                        Выключить
                    </div>
                </div>
            </div> : null}
        </>
    )
}

export default ModeratorControl