
import { getAuthAction } from "@/lib/auth/authAction";
import { LinksList } from "@/shared/components/Admin/linkList";
import { unstable_setRequestLocale } from "next-intl/server";
import styles from '@/shared/styles/Admin.module.sass'
import { getModelsAdmin, getPhotos } from "@/lib/models/getDataModel";
import { IPhoto } from "@/types/model/photo/photo";
import { PhotoType } from "@/enums/photoType";
import { PhotoStatus } from "@/enums/photoStatus";
import Image from "next/image";
import ModelInfo from "@/shared/components/Admin/ui/ModelInfo/ModelInfo";
import AdminVerifyContent from "@/shared/components/Admin/ui/AdminVerifyContent/AdminVerifyContent";
import { IModel } from "@/types/model/model/model";
import { INavigationLink } from "@/types/main/navigationLink";

// import { verify } from "jsonwebtoken";
export async function generateMetadata() {

    return {
        title: "Панель Управления",
    };
}


export default async function AdminModeratorPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const auth = await getAuthAction('AdminToken')
    const listAll = LinksList[auth.type]
    const list = Array.isArray(listAll) && listAll.filter(item => item.id === 0)[0] || LinksList[0][0]
    const photos = await getPhotos()
    const model: IModel[] = await getModelsAdmin({ profile_id: Number(auth._id) })
    let photoTmp: IPhoto[] = [], modelPhoto: IPhoto[][] = []
    if (photos && photos.filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.OnCheck)
        .length > 0) {
        photoTmp = photos.filter(
            (photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.OnCheck
        );
        modelPhoto = photoTmp.map((tmp) =>
            photos.filter(
                (photo: IPhoto) =>
                    photo.model_id === tmp.model_id &&
                    photo.status === PhotoStatus.Applyed &&
                    photo.type === PhotoType.PublicPhoto
            )
        )
    }



    return (
        <div className={styles.main_content}>

            <div className={styles.title}>{list.link}</div>
            {list.link === 'Верификация' && photoTmp.map((data, idx) =>
                <AdminVerifyContent key={data.photo_url} data={data} idx={idx} model={model} modelPhoto={modelPhoto} >
                    <ModelInfo data={model[idx]} />
                </AdminVerifyContent>

            )}
            {/* {list.link === 'FAQ' && <div>Пока пусто</div>} */}


        </div>
    )
}