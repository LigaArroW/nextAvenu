import { unstable_setRequestLocale } from "next-intl/server";

export default function AdminModeratorPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return <div>asdasdasd</div>
}