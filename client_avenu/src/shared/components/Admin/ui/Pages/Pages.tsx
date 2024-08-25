'use client';

import { Close } from "@/shared/assets/Close";
import { useEffect, useState } from "react";
import styles from "./Pages.module.sass";
import { useQuill } from "react-quilljs";
import { IPage } from "@/types/page/page";
import { updatePage } from "@/lib/pages/pagesAction";
import MessageModal from "@/shared/components/Modals/MessageModal";


interface IPageProps {
    pages: IPage[]
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



const Pages: React.FC<IPageProps> = ({ pages }) => {
    const [selectedPage, setSelectedPage] = useState({} as IPage);
    const [contentState, setContentState] = useState(false);
    const [contentEngState, setContentEngState] = useState(false);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const { quill: content, quillRef: setContent } = useQuill({ modules, theme: 'snow' });
    const { quill: contentEng, quillRef: setContentEng } = useQuill({ modules, theme: 'snow' });



    useEffect(() => {
        var element = document.getElementById("content");
        element?.scrollTo({ top: 0 });
    }, [selectedPage]);


    useEffect(() => {
        if (content && contentEng) {
            content.on('text-change', function (delta, oldDelta, source) {
                setContentState(content.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0);
            })
            contentEng.on('text-change', function (delta, oldDelta, source) {
                setContentEngState(contentEng.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0);
            })
        }

    }, [content, contentEng])

    useEffect(() => {
        if ((selectedPage.id !== undefined) && content && contentEng) {
            setIsButtonEnabled(
                contentState && contentEngState
                // content.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0 &&
                // contentEng.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0
            );
        }
    }, [content, contentEng, contentEngState, contentState, selectedPage.id]);


    useEffect(() => {
        if (content && contentEng) {
            content.clipboard.dangerouslyPasteHTML(selectedPage.content);
            contentEng.clipboard.dangerouslyPasteHTML(selectedPage.content_eng);
        }
    }, [content, contentEng, selectedPage.content, selectedPage.content_eng]);


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (content && content.getText().trim().length > 0 && contentEng && contentEng.getText().trim().length > 0) {
            const upd = await updatePage({ page: { ...selectedPage, content: content.getSemanticHTML(), content_eng: contentEng.getSemanticHTML() } });
            console.log("🚀 ~ handleSubmit ~ upd:", upd)
            if (upd.success) {
                setInfoMessage("Страница обновлена");
                setIsMessageModalShow(true);
            }
            if (!upd.success) {
                setInfoMessage("Ошибка при обновлении страницы");
                setIsMessageModalShow(true);
            }
        }
    };

    const handleMessageOnClick = () => {
        setIsMessageModalShow(false);
        window.scroll({ top: 0 });
    };


    return (
        <div className={styles.page_container}>
            <div className={styles.page_list}>
                <div className={styles.title}>Второстепенные страницы</div>
                {Array.isArray(pages) && pages.length > 0
                    ? pages.map((pageItem: IPage) => (
                        <div key={pageItem.id} className={styles.page_item_container}>
                            <div
                                className={`${styles.page_item} ${selectedPage.id === pageItem.id ? styles.active : ""}`}
                                onClick={() => {
                                    setSelectedPage(pageItem);

                                    // content?.clipboard.dangerouslyPasteHTML(pageItem.content);
                                    // contentEng?.clipboard.dangerouslyPasteHTML(pageItem.content_eng);



                                    // content?.setText(pageItem.content);
                                    // contentEng?.setText(pageItem.content_eng);
                                    // setContent(pageItem.content);
                                    // setContentEng(pageItem.content_eng);
                                }}
                            >
                                {pageItem.title}
                            </div>
                        </div>
                    ))
                    : null}
            </div>
            {selectedPage.id !== undefined ? (
                <div className={styles.content} id="content">
                    <div className={styles.content_title}>{selectedPage.title}</div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_row}>
                            <div className={styles.part_title}></div>
                            <div className={styles.part}>Русский язык</div>
                            <div className={styles.part}>Английский язык</div>
                        </div>
                        <div className={styles.form_row}>
                            <div className={styles.part_title}>Содержание страницы</div>
                            <div className={styles.part}>
                                <div className={`${styles.quill} ${content?.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                                    ? styles.wrong
                                    : ""
                                    }`}>
                                    <div ref={setContent} />
                                </div>
                                {/* <ReactQuill
                                    ref={quillRefContent}
                                    className={`${styles.quill} ${content.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                                        ? styles.wrong
                                        : ""
                                        }`}
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={{ toolbar: toolbarOptions }}
                                    onKeyUp={() => setContent(`${quillRefContent.current?.getEditorContents()}`)}
                                /> */}
                                <div
                                    className={`${styles.close} ${content !== undefined &&
                                        content.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                                        ? styles.active
                                        : ""
                                        }`}
                                    onClick={() => {
                                        content?.deleteText(0, content?.getText().length);
                                        setSelectedPage({ ...selectedPage, content: "" });
                                    }}
                                    title="Очистить поле"
                                >
                                    <Close fill="#444444" />
                                </div>
                            </div>
                            <div className={styles.part}>
                                <div className={`${styles.quill} ${content?.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                                    ? styles.wrong
                                    : ""
                                    }`}>
                                    <div ref={setContentEng} />
                                </div>
                                {/* <ReactQuill
                                    ref={quillRefContentEng}
                                    className={`${styles.quill} ${contentEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                                        ? styles.wrong
                                        : ""
                                        }`}
                                    theme="snow"
                                    value={contentEng}
                                    onChange={setContentEng}
                                    modules={{ toolbar: toolbarOptions }}
                                    onKeyUp={() => setContentEng(`${quillRefContentEng.current?.getEditorContents()}`)}
                                /> */}
                                <div
                                    className={`${styles.close} ${contentEng !== undefined &&
                                        contentEng.getText().replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                                        ? styles.active
                                        : ""
                                        }`}
                                    onClick={() => {
                                        contentEng?.deleteText(0, contentEng?.getText().length);
                                        setSelectedPage({ ...selectedPage, content_eng: "" });
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
        </div>
    );
};

export default Pages;