import { getTranslations } from "next-intl/server";
import styles from '@/shared/styles/Home.module.sass'
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

interface IHomeProps {
    type: HomePageType;
    forModerator?: boolean;
}

const getModels = async () => {
    const response = await fetch('http://localhost:8001/api/models', {
        method: 'GET',
        next: { tags: ['models'] },
    });
    // console.log("🚀 ~ getModels ~ response:", response)

    return response.json();
}

interface FiltredFields {
    [key: string]: [];
}

const getFiltredFields = async (): Promise<FiltredFields> => {
    const responseJsons: FiltredFields = {};

    await Promise.all(
        filtredFields.map(async (field) => {

            const response = await fetch(`http://localhost:8001/api/${field}`, {
                method: 'GET',
                cache: 'force-cache',
            });
            const json = await response.json();

            responseJsons[field] = json;
        })
    );

    return responseJsons;
};


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

    const calcIsNew = (create_date: Date) => {
        var now = new Date();
        var createDate = new Date(create_date);
        var difference = Math.abs(now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
        return difference <= 7;
    };

    return (
        <div className={styles.wrapper_content}>
            {/* 
            {filtredModel && filtredModel.length > 0 && (
                filtredModel.map((model: IModel) => (
                    <div key={model.id}>
                        <h1 >{model.name}</h1>
                        <Image src={`http://localhost:8001/api/photos/${(model.photos[0]?.photo_url)?.split('/')[3]}`}
                         alt={model.name}
                          width={250}
                          height={250}
                          />
                    </div>
                ))
            )} */}
            <Models forModerator={forModerator}  models={filtredModel} generalfields={filtredFields}/>
            <Filters generalfields={filtredFields}/>
            {/* <Models isFiltersActive={isFiltersActive} setIsFiltersActive={setIsFiltersActive} forModerator={forModerator} /> */}
            {/* <Filters isFiltersActive={isFiltersActive} setIsFiltersActive={setIsFiltersActive} /> */}
        </div>
    );
};

export default Home;


