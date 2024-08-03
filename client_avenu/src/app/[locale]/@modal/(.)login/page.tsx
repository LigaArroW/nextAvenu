
import ModalLogin from './ui/ModalLogin';
import { unstable_setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic'

export default function LoginModalPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <ModalLogin />
    )
}