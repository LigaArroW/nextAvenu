import { useTranslations } from "next-intl";
import styles from '@/shared/styles/Home.module.sass'
import { HomePageType } from "@/enums/homePageType";
import { IModel } from "@/types/model/model/model";
import Models from "./ui/Models";

interface IHomeProps {
    type: HomePageType;
    forModerator?: boolean;
    models?: IModel[]
}



const Home: React.FC<IHomeProps> = async ({ type, forModerator = false, models }) => {
    const t = useTranslations()
    // const model = await getModels()
    console.log(models);
    let filtredModel = models

    switch (type) {
        case HomePageType.AllModels:
            if (Array.isArray(models) && models.length > 0) {
                filtredModel = models.filter((model: IModel) => model.is_enable)
            }
            break;
    }



    return (
        <div className={styles.wrapper_content}>
            {/* <Models /> */}
            {/* <Models isFiltersActive={isFiltersActive} setIsFiltersActive={setIsFiltersActive} forModerator={forModerator} /> */}
            {/* <Filters isFiltersActive={isFiltersActive} setIsFiltersActive={setIsFiltersActive} /> */}
        </div>
    );
};

export default Home;


