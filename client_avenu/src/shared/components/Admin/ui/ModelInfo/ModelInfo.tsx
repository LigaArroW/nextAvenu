import { getFiltredFields } from "@/lib/models/getModelsFilter"
import { IGeneral } from "@/types/core/generalFilters"
import { IModel } from "@/types/model/model/model"
import { getLocale, getTranslations } from "next-intl/server"


import styles from '@/shared/styles/Admin.module.sass'
import { IModelType } from "@/types/core/modelType"
import { IBreastSize } from "@/types/core/breastSize"
import { IBreastType } from "@/types/core/breastType"
import { IHairColor } from "@/types/core/hairColor"
import { IHairSize } from "@/types/core/hairSize"
import { IEthnicGroup } from "@/types/core/ethnicGroup"
import { INationality } from "@/types/core/nationality"
import { ITatoo } from "@/types/core/tatoo"
import { IModelPiercing } from "@/types/model/piercing/modelPiercing"
import { IPiercing } from "@/types/model/piercing/piercing"
import { IEyesColor } from "@/types/core/eyesColor"

interface IModelInfo {
    data: IModel
}


const ModelInfo: React.FC<IModelInfo> = async ({ data }) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const filtredFields: Partial<IGeneral> = await getFiltredFields()

    return <div className={styles.content}>
        <div className={styles.parameters}>
            <div className={styles.parameter}>
                {t("model.age")}:<div className={styles.value}>{data.age}</div>
            </div>
            <div className={styles.parameter}>
                {t("model.weight")}:
                <div className={styles.value}>
                    {data.weight} {t("model.kg")}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.height")}:
                <div className={styles.value}>
                    {data.height} {t("model.cm")}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.model_type")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.model_types && filtredFields.model_types.find((modelType: IModelType) => modelType.id === data.type_id)?.type
                        : filtredFields.model_types && filtredFields.model_types.find((modelType: IModelType) => modelType.id === data.type_id)?.type_eng}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.breast")}:
                <div className={styles.value}>
                    {`${filtredFields.breast_sizes && filtredFields.breast_sizes.find((breasSize: IBreastSize) => breasSize.id === data.breast_size_id)?.breast_size
                        } ${locale === "ru"
                            ? filtredFields.breast_types && filtredFields.breast_types.find((breastType: IBreastType) => breastType.id === data.breast_type_id)
                                ?.breast_type
                            : filtredFields.breast_types && filtredFields.breast_types.find((breastType: IBreastType) => breastType.id === data.breast_type_id)
                                ?.breast_type_eng
                        }`}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.hair_color")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.hair_colors && filtredFields.hair_colors.find((hairColor: IHairColor) => hairColor.id === data.hair_color_id)?.hair_color
                        : filtredFields.hair_colors && filtredFields.hair_colors.find((hairColor: IHairColor) => hairColor.id === data.hair_color_id)?.hair_color_eng}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.hair_size")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.hair_sizes && filtredFields.hair_sizes.find((hairSize: IHairSize) => hairSize.id === data.hair_size_id)?.hair_size
                        : filtredFields.hair_sizes && filtredFields.hair_sizes.find((hairSize: IHairSize) => hairSize.id === data.hair_size_id)?.hair_size_eng}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.ethnic_group")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.ethnic_groups && filtredFields.ethnic_groups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === data.ethnic_group_id)
                            ?.ethnic_group
                        : filtredFields.ethnic_groups && filtredFields.ethnic_groups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === data.ethnic_group_id)
                            ?.ethnic_group_eng}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.nationality")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.nationalities && filtredFields.nationalities.find((nationality: INationality) => nationality.id === data.nationality_id)
                            ?.nationality
                        : filtredFields.nationalities && filtredFields.nationalities.find((nationality: INationality) => nationality.id === data.nationality_id)
                            ?.nationality_eng}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.tattoo")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.tatoos && filtredFields.tatoos.find((tatoo: ITatoo) => tatoo.id === data.tatoo_id)?.tatoo
                        : filtredFields.tatoos && filtredFields.tatoos.find((tatoo: ITatoo) => tatoo.id === data.tatoo_id)?.tatoo_eng}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.piercing")}:
                <div className={styles.value}>
                    {data.model_piercings.map(
                        (modelPiercing: IModelPiercing, index: number) =>
                            `${index ? " | " : ""} ${locale === "ru"
                                ? filtredFields.piercings && filtredFields.piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                                    ?.piercing
                                : filtredFields.piercings && filtredFields.piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                                    ?.piercing_eng
                            }`
                    )}
                </div>
            </div>
            <div className={styles.parameter}>
                {t("model.eyes_color")}:
                <div className={styles.value}>
                    {locale === "ru"
                        ? filtredFields.eyes_colors && filtredFields.eyes_colors.find((eyesColor: IEyesColor) => eyesColor.id === data.eyes_color_id)?.eyes_color
                        : filtredFields.eyes_colors && filtredFields.eyes_colors.find((eyesColor: IEyesColor) => eyesColor.id === data.eyes_color_id)?.eyes_color_eng}
                </div>
            </div>
        </div>
    </div>
}

export default ModelInfo