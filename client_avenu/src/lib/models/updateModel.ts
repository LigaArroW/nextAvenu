'use server'

import { IModel } from "@/types/model/model/model";


export default async function updateModel(tmpModel: IModel) {
    try {
        await fetch('http://localhost:8001/api/update_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                params: {
                    model: tmpModel
                }
            })
        }).then((res) => res.json())
        return {
            success: true
        }
    } catch (error) {
        console.log('🚀 ~ updateAboutData ~ error:', error);
    }
}