
import ModalContact from './ui/ModalContact';
import { unstable_setRequestLocale } from 'next-intl/server';


export default function ContactModalPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <ModalContact />
    )

}

