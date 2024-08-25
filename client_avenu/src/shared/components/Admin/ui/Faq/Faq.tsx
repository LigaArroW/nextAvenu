'use client';

import { useEffect, useState } from "react";


import { IFaq } from "@/types/faq/faq";
import styles from "./Faq.module.sass";
import { addFaq, deleteFaq, getFaqs, updateFaq } from "@/lib/faq/faqAction";
import MessageModal from "@/shared/components/Modals/MessageModal";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import { initFaq } from "@/types/faq/initFaq";
import { Close } from "@/shared/assets/Close";


import { useQuill } from 'react-quilljs';


import '@/widgets/quill.css';




interface IFaqProps {
    faqs: IFaq[]
}


const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],

        [{ indent: '-1' }, { indent: '+1' }],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
};


const Faq: React.FC<IFaqProps> = ({ faqs }) => {
    const [selectedFaq, setSelectedFaq] = useState(initFaq());
    const [answerState, setAnswerState] = useState(false);
    const [answerEngState, setAnswerEngState] = useState(false);

    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [deletedFaq, setDeletedFaq] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);
    const { quill: answer, quillRef: setAnswer } = useQuill({ modules, theme: 'snow' });
    const { quill: answerEng, quillRef: setAnswerEng } = useQuill({ modules, theme: 'snow' });



    useEffect(() => {
        var element = document.getElementById("content");
        element?.scrollTo({ top: 0 });
    }, [selectedFaq]);


    useEffect(() => {
        if (answer && answerEng) {
            answer.on('text-change', function (delta, oldDelta, source) {
                setAnswerState(answer.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0);
            })
            answerEng.on('text-change', function (delta, oldDelta, source) {
                setAnswerEngState(answerEng.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0);
            })
        }

    }, [answer, answerEng])

    useEffect(() => {
        if (selectedFaq.id !== undefined && answer !== undefined && answerEng !== undefined) {

            setIsButtonEnabled(
                selectedFaq.question.trim().length > 0 &&
                selectedFaq.question_eng.trim().length > 0 && answerEngState && answerState
                // answer.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0 &&
                // answerEng.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0
            );
        }
    }, [selectedFaq, answer, answerEng, answerEngState, answerState]);

    useEffect(() => {
        if (answer && answerEng) {
            answer.clipboard.dangerouslyPasteHTML(selectedFaq.answer);
            answerEng.clipboard.dangerouslyPasteHTML(selectedFaq.answer_eng);
        }
    }, [answer, answerEng, selectedFaq.answer, selectedFaq.answer_eng]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (
            selectedFaq.question.trim().length > 0 &&
            selectedFaq.question_eng.trim().length > 0 &&
            answer && answer?.getText().trim().length > 0 &&
            answerEng && answerEng?.getText().trim().length > 0
        ) {
            if (selectedFaq.id > 0) {
                const upd = await updateFaq({ faq: { ...selectedFaq, answer: answer?.getSemanticHTML(), answer_eng: answerEng?.getSemanticHTML() } });
                if (upd.success) {
                    setInfoMessage("Вопрос обновлен");
                    setIsMessageModalShow(true);
                }
                if (!upd.success) {
                    setInfoMessage("Ошибка при обновлении вопроса");
                    setIsMessageModalShow(true);
                }
            } else {
                const add = await addFaq({ faq: { ...selectedFaq, answer: answer?.getSemanticHTML(), answer_eng: answerEng?.getSemanticHTML() } });
                if (add.success) {
                    setInfoMessage("Вопрос добавлен");
                    setIsMessageModalShow(true);
                    const newFaqs = await getFaqs();
                    setSelectedFaq(newFaqs[newFaqs.length - 1]);

                }
                if (!add.success) {
                    setInfoMessage("Ошибка при добавлении вопроса");
                    setIsMessageModalShow(true);
                }

            }
        }
    };

    const handleMessageOnClick = () => {
        setIsMessageModalShow(false);
        window.scroll({ top: 0 });
    };

    const handleDeleteOnClick = (faqId: number) => {
        setDeletedFaq(faqId);
        setIsConfirmModalShow(true);
    };

    const handleCondirmDelete = async () => {
        deleteFaq({ id: deletedFaq })

        setIsConfirmModalShow(false);
        setSelectedFaq(initFaq())
        answer?.setText("");
        answerEng?.setText("");
    }


    return (
        <div className={styles.faq_container}>
            <div className={styles.faq_list}>
                <div className={styles.title}>Часто задаваемые вопросы</div>
                {faqs.map((faqItem: IFaq) => (
                    <div key={faqItem.id} className={styles.faq_item_container}>
                        <div
                            className={`${styles.faq_item} ${selectedFaq.id === faqItem.id ? styles.active : ""}`}
                            onClick={() => {
                                setSelectedFaq(faqItem);


                                // answer?.clipboard.dangerouslyPasteHTML(faqItem.answer);
                                // answerEng?.clipboard.dangerouslyPasteHTML(faqItem.answer_eng);

                                // answer?.setText(faqItem.answer);
                                // answerEng?.setText(faqItem.answer_eng);
                            }}
                        >
                            {faqItem.question}
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        setSelectedFaq(initFaq());
                        answer?.setText("");
                        answerEng?.setText("");
                    }}
                >
                    Добавить вопрос
                </button>
            </div>
            {selectedFaq.id !== undefined ? (
                <div className={styles.content} id="content">
                    <div className={styles.content_title}>
                        {selectedFaq.id === -1 ? "Добавление вопроса" : "Редактирование вопроса"}
                        {selectedFaq.id > 0 ? (
                            <button type="button" onClick={() => handleDeleteOnClick(selectedFaq.id)}>
                                Удалить вопрос
                            </button>
                        ) : null}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_row}>
                            <div className={styles.part_title}></div>
                            <div className={styles.part}>Русский язык</div>
                            <div className={styles.part}>Английский язык</div>
                        </div>
                        <div className={styles.form_row}>
                            <div className={styles.part_title}>Вопрос</div>
                            <div className={styles.part}>
                                <input
                                    placeholder=""
                                    type="text"
                                    required
                                    onChange={(event) =>
                                        setSelectedFaq({
                                            ...selectedFaq,
                                            question: event.target.value,
                                            // answer: answer?.getText() || "",
                                            // answer_eng: answerEng?.getText() || ""
                                        })
                                    }
                                    value={selectedFaq.question}
                                    className={selectedFaq.question.trim() === "" ? styles.wrong : ""}
                                />
                                <div
                                    className={`${styles.close} ${selectedFaq.question.length > 0 ? styles.active : ""}`}
                                    onClick={() => setSelectedFaq({ ...selectedFaq, question: "" })}
                                    title="Очистить поле"
                                >
                                    <Close fill="#444444" />
                                </div>
                            </div>
                            <div className={styles.part}>
                                <input
                                    placeholder=""
                                    type="text"
                                    required
                                    onChange={(event) =>
                                        setSelectedFaq({
                                            ...selectedFaq,
                                            question_eng: event.target.value,
                                            // answer: answer?.getText() || "",
                                            // answer_eng: answerEng?.getText() || "",
                                        })
                                    }
                                    value={selectedFaq.question_eng}
                                    className={selectedFaq.question_eng.trim() === "" ? styles.wrong : ""}
                                />
                                <div
                                    className={`${styles.close} ${selectedFaq.question_eng.length > 0 ? styles.active : ""}`}
                                    onClick={() => setSelectedFaq({ ...selectedFaq, question_eng: "" })}
                                    title="Очистить поле"
                                >
                                    <Close fill="#444444" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_row}>
                            <div className={styles.part_title}>Ответ</div>
                            <div className={styles.part}>
                                <div className={`${styles.quill} ${answer?.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                                    ? styles.wrong
                                    : ""
                                    }`}>
                                    <div ref={setAnswer} />
                                </div>
                                <div
                                    className={`${styles.close} ${answer !== undefined &&
                                        answer.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                                        ? styles.active
                                        : ""
                                        }`}
                                    onClick={() => {
                                        answer?.deleteText(0, answer.getText().length);
                                        setSelectedFaq({ ...selectedFaq, answer: "" });
                                    }}
                                    title="Очистить поле"
                                >
                                    <Close fill="#444444" />
                                </div>
                            </div>
                            <div className={styles.part}>
                                <div className={`${styles.quill} ${answerEng?.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                                    ? styles.wrong
                                    : ""
                                    }`}>
                                    <div ref={setAnswerEng} />
                                </div>
                                <div
                                    className={`${styles.close} ${answerEng !== undefined &&
                                        answerEng.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                                        ? styles.active
                                        : ""
                                        }`}
                                    onClick={() => {
                                        // setAnswerEng("");
                                        answerEng?.deleteText(0, answerEng.getText().length);
                                        setSelectedFaq({ ...selectedFaq, answer_eng: "" });
                                        console.log(answerEng);
                                    }}
                                    title="Очистить поле"
                                >
                                    <Close fill="#444444" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={!isButtonEnabled}>
                            Сохранить
                        </button>
                    </form>
                </div>
            ) : null}
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText="Ok"
                handlerButtonClick={handleMessageOnClick}
            />}
            <ConfirmMessageModal
                text="Вы действительно хотите удалить вопрос?"
                okButtonText="Удалить"
                handlerOkOnClick={() => handleCondirmDelete()}
                cancelButtonText="Отмена"
                isShow={isConfirmModalShow}
                setIsShow={setIsConfirmModalShow}
            />
        </div>
    );
};

export default Faq;