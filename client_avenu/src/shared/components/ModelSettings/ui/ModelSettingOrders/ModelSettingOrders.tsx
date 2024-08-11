'use client'

import { IProposal } from "@/types/proposal/proposal";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import { useEffect, useState } from "react";
import { ProposalStatus } from "@/enums/proposalStatus";
import { ITarif } from "@/types/model/tarif/tarif";
import { IProposalView } from "@/types/proposal/proposalView";
import { getProposalViews, updateProposalViews } from "@/lib/proposal/proposalAction";
import styles from "./Orders.module.sass";
import pageStyles from '@/shared/styles/ModelSettings.module.sass'

interface IModelSettingOrders {
    proposals: IProposal[]
}

const ModelSettingOrders: React.FC<IModelSettingOrders> = ({ proposals }) => {
    const t = useTranslations()
    const locale = useLocale()
    const { model } = useNewModelContext()
    const [modelProposals, setModelProposals] = useState([] as IProposal[]);

    useEffect(() => {
        if (model.id > 0) {
            const modelProposalsTmp = proposals.filter(
                (proposal: IProposal) =>
                    proposal.status === ProposalStatus.Applyed &&
                    (model.tarifs.length === 0 ||
                        model.tarifs.filter((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2).length ===
                        0 ||
                        (proposal.min_price <
                            model.tarifs.find((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2)!.price &&
                            proposal.max_price >
                            model.tarifs.find((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2)!.price))
            );
            setModelProposals(modelProposalsTmp);
            if (modelProposalsTmp.length > 0) {
                let modelProposalsViews = [] as IProposalView[];
                modelProposalsTmp.forEach((proposal: IProposal) => {
                    modelProposalsViews.push({ model_id: model.id, proposal_id: proposal.id } as IProposalView);
                });
                updateProposalViews({ model_id: model.id, proposal_views: modelProposalsViews });
                getProposalViews();
            }
        }
    }, [model, proposals]);

    return (
        <div className={pageStyles.content}>
            <div className={pageStyles.title}>{t("model.orders")}</div>
            {modelProposals.length > 0 ? (
                <div className={styles.proposals_list}>
                    {modelProposals.map((proposal: IProposal) => (
                        <div key={proposal.id} className={styles.proposal_item}>
                            <div className={styles.parameter}>
                                <div className={styles.parameter_name}>{t("global.name")}</div>
                                <div>{proposal.name}</div>
                            </div>
                            <div className={styles.parameter}>
                                <div className={styles.parameter_name}>{t("model.contact_for_communication")}</div>
                                <div>{proposal.contact}</div>
                            </div>
                            <div className={styles.parameter}>
                                <div className={styles.parameter_name}>{t("model.price")}</div>
                                <div>{`${proposal.min_price} - ${proposal.max_price}`}</div>
                            </div>
                            <div className={styles.parameter}>
                                <div className={styles.parameter_name}>{t("model.meeting_place")}</div>
                                <div>{proposal.place}</div>
                            </div>
                            <div className={styles.parameter}>
                                <div className={styles.parameter_name}>{t("profile.description")}</div>
                                <div>{proposal.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ModelSettingOrders;