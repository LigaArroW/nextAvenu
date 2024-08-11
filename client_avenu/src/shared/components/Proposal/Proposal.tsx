'use client';

import Slider from "react-slider";
import { useLocale, useTranslations } from "next-intl";
import styles from '@/shared/styles/Proposal.module.sass'
import { useEffect, useState } from "react";
import { initProposal } from "@/types/proposal/initProposal";
import { IProposalPlace } from "@/types/core/proposalPlace";
import MessageModal from "../Modals/MessageModal";
import { useRouter } from "next/navigation";
import { Person } from "@/lib/auth/authAction";
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import { addProposal } from "@/lib/proposal/proposalAction";
import { ProposalStatus } from "@/enums/proposalStatus";

interface IProposal {
    person: Person
    proposalPlaces: IProposalPlace[]
}


const Proposal: React.FC<IProposal> = ({ person, proposalPlaces }) => {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [proposal, setProposal] = useState(initProposal());
    const [selectedPlace, setSelectedPlace] = useState(1);


    useEffect(() => {
        if (person.token === '') {
            setInfoMessage(t("model.order_guest"));
            setIsMessageModalShow(true);
        }
    }, [person.token, t])

    useEffect(() => {
        setIsButtonEnabled(
            proposal.name.trim().length > 0 &&
            proposal.description.trim().length > 0 &&
            proposal.place.trim().length > 0 &&
            proposal.place.trim().length > 0
        );
    }, [proposal]);

    useEffect(() => {
        if (selectedPlace === 0) {
            setProposal({ ...proposal, place: "" });
        } else {
            setProposal({
                ...proposal,
                place:
                    selectedPlace === 0
                        ? ""
                        : proposalPlaces.find((proposalPlace: IProposalPlace) => proposalPlace.id === selectedPlace)?.place!,
            });
        }
    }, [selectedPlace]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (
            proposal.name.trim().length > 0 &&
            proposal.description.trim().length > 0 &&
            proposal.place.trim().length > 0 &&
            proposal.contact.trim().length > 0 &&
            proposal.place.trim().length > 0
        ) {
            const response = await addProposal({ proposal: { ...proposal, profile_id: Number(person._id), status: ProposalStatus.Applyed } });
            if (response.success) {
                router.push(`/${locale}`);
            }
            if (!response.success) {
                setInfoMessage(response.message);
                setIsMessageModalShow(true);
            }


        }
    };


    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("global.make_an_order")}</div>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_field}>
                    <div className={styles.label}>{t("global.name")}</div>
                    <input
                        placeholder=""
                        type="name"
                        required
                        onChange={(event) => setProposal({ ...proposal, name: event.target.value.trim() })}
                        value={proposal.name}
                    />
                    <div className={'required'}>*</div>
                </div>
                <div className={styles.input_field}>
                    <div className={styles.label}>{t("model.contact_for_communication")}</div>
                    <input
                        placeholder=""
                        type="text"
                        required
                        onChange={(event) => setProposal({ ...proposal, contact: event.target.value.trim() })}
                        value={proposal.contact}
                    />
                    <div className={'required'}>*</div>
                </div>
                <div className={styles.slider_field}>
                    <div className={styles.label}>{`${t("model.price")} (${t("global.from")} ${proposal.min_price} ${t("global.to")} ${proposal.max_price
                        })`}</div>
                    <div className={'range_slider'}>
                        <Slider
                            className={'slider'}
                            value={[proposal.min_price, proposal.max_price]}
                            min={0}
                            max={100000}
                            onChange={(selectedRange) =>
                                setProposal({ ...proposal, min_price: selectedRange[0], max_price: selectedRange[1] })
                            }
                        />
                    </div>
                </div>
                <div className={styles.radio_group_container}>
                    <div className={styles.label}>{t("model.meeting_place")}</div>
                    <div className={styles.radio_group}>
                        {proposalPlaces.map((proposalPlace: IProposalPlace) => (
                            <div key={proposalPlace.id} className={styles.item}>
                                <div
                                    className={`${styles.button} ${selectedPlace === proposalPlace.id ? styles.active : ""}`}
                                    onClick={() => setSelectedPlace(proposalPlace.id)}
                                />
                                {locale === "ru" ? proposalPlace.place : proposalPlace.place_eng}
                            </div>
                        ))}
                        <div className={styles.item}>
                            <div
                                className={`${styles.button} ${selectedPlace === 0 ? styles.active : ""}`}
                                onClick={() => setSelectedPlace(0)}
                            />
                            {t("model.your_own_version")}
                        </div>
                    </div>
                </div>
                {selectedPlace === 0 ? (
                    <div className={styles.input_field}>
                        <div className={styles.label}>{t("model.meeting_place")}</div>
                        <input
                            placeholder=""
                            type="text"
                            required
                            onChange={(event) => setProposal({ ...proposal, place: event.target.value.trim() })}
                            value={proposal.place}
                        />
                        <div className={'required'}>*</div>
                    </div>
                ) : null}
                <div className={styles.textarea_field}>
                    <div className={styles.label}>{t("profile.description")}</div>
                    <textarea
                        placeholder=""
                        required
                        onChange={(event) => setProposal({ ...proposal, description: event.target.value.trim() })}
                        value={proposal.description}
                    />
                    <div className={'required'}>*</div>
                </div>
                {/* <button type="submit" disabled={!isButtonEnabled}>
                    {t("global.save")}
                </button> */}
                <ButtonSubmitForm
                    text="global.save"
                    disabled={!isButtonEnabled}
                />
            </form>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => router.push(`/${locale}`)}

            />}
        </div>
    );
};

export default Proposal;