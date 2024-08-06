import { unstable_setRequestLocale } from "next-intl/server";


export default function EmailLoginPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <div>Логин через почту</div>
    )
}
