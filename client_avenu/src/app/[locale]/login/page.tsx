
import LoginContent from "@/shared/components/LoginContent/LoginContent";
import { unstable_setRequestLocale } from "next-intl/server";

export const dynamic = 'force-dynamic'

export default async function LoginPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <LoginContent />
    )
}
