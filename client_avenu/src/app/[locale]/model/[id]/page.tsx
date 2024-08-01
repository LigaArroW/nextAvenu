import { IModel } from "@/types/model/model/model";
import { unstable_setRequestLocale } from "next-intl/server";




export async function generateStaticParams() {

    const models = await fetch('http://localhost:8001/api/models', {
        method: 'GET'
    }).then((res) => res.json());

    return models.map((model: IModel) => ({
        id: String(model.id).padStart(8, "0"),
    }))


}




export default function ModelPage({ params: { id, locale } }: { params: { id: string, locale: string } }) {
    unstable_setRequestLocale(locale);
    return (

        <div>ModelPage {id}</div>
    )
}   