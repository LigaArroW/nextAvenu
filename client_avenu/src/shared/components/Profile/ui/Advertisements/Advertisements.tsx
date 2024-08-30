'use client'


import { Person } from '@/lib/auth/authAction';
import { Search } from '@/shared/assets/Search';
import styles from '@/shared/styles/Profile.module.sass'
import { IModel } from '@/types/model/model/model';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileModel from '../ProfileModel/ProfileModel';
import { IProposal } from '@/types/proposal/proposal';
import { IProposalView } from '@/types/proposal/proposalView';
import { getModels } from '@/lib/models/getDataModel';

interface IAdvertisements {
    person: Person
    models: IModel[]
    positionsUp: any[]
    proposals: IProposal[]
    proposalViews: IProposalView[]
}


const modelsData = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/models?profile_id=${id}`,
        {
            // body: JSON.stringify({ profile_id: profile_id }),
            // next: { tags: ['Models'], revalidate: 5 },

            cache: 'no-store'
        }
    )

    return response.json()

}


const Advertisements: React.FC<IAdvertisements> = ({ person, models: modelsDef, positionsUp: Up, proposals, proposalViews }) => {

    const [positionsUp, setPositionUp] = useState(Up);
    const [models, SetModels] = useState<IModel[]>([])
    const t = useTranslations();
    const locale = useLocale()
    const router = useRouter()

    const [searchedModels, setSearchedModels] = useState(models.filter((model: IModel) => model.agency_id === Number(person._id)));
    const [searchedName, setSearchedName] = useState("");


    useEffect(() => {

        modelsData(person._id).then((data) => {

            SetModels(data)

        })
    }, [person, positionsUp])


    useEffect(() => {



        let modelsTemp: IModel[] = []
        if (searchedName.trim() != "") {
            const value = searchedName.trim().toLowerCase();
            modelsTemp = models.filter(
                (model: IModel) =>
                    model.agency_id === Number(person._id) &&
                    (model.name.toLowerCase().startsWith(value) || String(model.id).startsWith(value))
            );
        } else {
            modelsTemp = models.filter((model: IModel) => model.agency_id === Number(person._id));
        }

        if (models && positionsUp && positionsUp.length > 0) {

            modelsTemp = modelsTemp.map(m => {

                const positionUp = positionsUp.find((p) => m.id === p.model_id)
                let positionsUpLeft = 6
                if (positionUp && positionUp.last_try) {
                    const dateNow = new Date().toISOString().substring(0, 13)
                    const dateLastPositionUp = new Date(positionUp.last_try).toISOString().substring(0, 13)
                    if (dateNow === dateLastPositionUp) {
                        positionsUpLeft = positionUp.attempts_number
                    }
                }
                return { ...m, positionsUpLeft }
            })
        }

        setSearchedModels(modelsTemp);


    }, [models, searchedName, positionsUp, person._id]);


    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("global.advertisements")}</div>
            <div className={`${styles.main_info} ${styles.full_width}`}>
                <div className={styles.search}>
                    <input placeholder={t("profile.search_by_name")} onChange={(event) => setSearchedName(event.target.value)} />
                    <div className={styles.search_icon}>
                        <Search fill="#98042D" />
                    </div>
                </div>
            </div>
            <div className={styles.models_wrapper}>
                {searchedModels.map((model: IModel) => (
                    <ProfileModel model={model} key={model.id} proposals={proposals} proposalViews={proposalViews} person={person} setPositionUp={setPositionUp} />
                ))}
            </div>
            <button type="button" onClick={() => router.push(`/${locale}/profile/model_settings/parameters/new`)}>
                {t("profile.add_advertisement")}
            </button>
        </div>
    );
};

export default Advertisements;