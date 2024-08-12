import { getTranslations } from "next-intl/server";
import { HomePageType } from "@/enums/homePageType";
import { IModel } from "@/types/model/model/model";
import Models from "./ui/Models/Models";
import { revalidateTag } from "next/cache";
import { IVideo } from "@/types/model/video/video";
import { VideoStatus } from "@/enums/videoStatus";
import Image from "next/image";
import { IPhoto } from "@/types/model/photo/photo";
import Filters from "./ui/Filters/Filters";
import { filtredFields } from "@/shared/constant/filtredFields";
import { IGeneral } from "@/types/core/generalFilters";
import { HomeProvider } from "./ui/Context/HomeProvider";
import { getModels } from "@/lib/models/getDataModel";
import { getFiltredFields } from "@/lib/models/getModelsFilter";
import { calcIsNew } from "@/shared/constant/calcIsNew";

import styles from '@/shared/styles/Home.module.sass'

interface IHomeProps {
    type: HomePageType;
    forModerator?: boolean;
}



const Home: React.FC<IHomeProps> = async ({ type, forModerator = false }) => {
    const t = await getTranslations()
    const models = await getModels()
    // console.log(models);
    const filtredFields: Partial<IGeneral> = await getFiltredFields()




    let filtredModel: IModel[] = [];
    switch (type) {
        case HomePageType.AllModels:
            if (Array.isArray(models) && models.length > 0) {
                filtredModel = [...models.filter((model: IModel) => model.is_enable)]
            }
            break;
        case HomePageType.New:
            if (Array.isArray(models) && models.length > 0) {
                filtredModel = [...models.filter((model: IModel) => model.is_enable && calcIsNew(model.create_date))]
            }
            break;
        case HomePageType.Verified:
            if (Array.isArray(models) && models.length > 0) {
                filtredModel = [...models.filter((model: IModel) => model.is_enable && model.is_verified)]
            }
            break;
        case HomePageType.WithVideo:
            if (Array.isArray(models) && models.length > 0) {
                filtredModel = [...models.filter((model: IModel) => model.is_enable && model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length > 0)]
            }
            break
    }



    return (
        <div className={styles.wrapper_content}>
            <HomeProvider >
                <Models forModerator={forModerator} models={filtredModel} generalfields={filtredFields} />
                <Filters generalfields={filtredFields} />
            </HomeProvider>


        </div>
    );
};

export default Home;


