'use client';

import { updateModel } from "@/lib/models/postDataModels";
import { IModel } from "@/types/model/model/model";
import { useRouter } from "next/navigation";




import { useEffect, useState } from "react";

interface ITextAreaProps {
    model: IModel
    style?: string

}

const TextArea: React.FC<ITextAreaProps> = ({ model, style }) => {
    const [textValue, setTextValue] = useState(model.about_self);


    const handleChange = async (value: string) => {

        updateModel({ model: { ...model, about_self: value } })
        setTextValue(value)
    }


    return (
        <textarea
            className={style}
            value={textValue}
            onChange={e => handleChange(e.target.value)}
        />
    );


}

export default TextArea