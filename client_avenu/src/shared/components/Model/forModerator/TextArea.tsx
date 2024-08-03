'use client';

import updateModel from "@/lib/models/updateModel";
import { IModel } from "@/types/model/model/model";
import { useRouter } from "next/navigation";




import { useEffect, useState } from "react";

interface ITextAreaProps {
    model: IModel
    style?: string

}

const TextArea: React.FC<ITextAreaProps> = ({ model, style }) => {
    const [textValue, setTextValue] = useState(model.about_self);
    const router = useRouter()

    useEffect(() => {

        // const updateAboutData = async (tmpModel: IModel) => {
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
        //     } catch (error) {
        //         console.log('🚀 ~ updateAboutData ~ error:', error);
        //     }
        // }

        if (textValue !== model.about_self) {
            const tmpModel = { ...model, about_self: textValue }
            updateModel(tmpModel)
        }
    }, [model, textValue])

    useEffect(() => {
        router.refresh()
    }, [textValue])



    return (
        <textarea
            className={style}
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
        />
    );


}

export default TextArea