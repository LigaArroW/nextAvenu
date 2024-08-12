import { getAuthAction } from "@/lib/auth/authAction"
import { getDistricts } from "@/lib/district/districkAction";
import { getFaqs } from "@/lib/faq/faqAction";
import { getUndergrounds } from "@/lib/underground/undergroundAction";
import { LinksList } from "@/shared/components/Admin/linkList"
import Accounts from "@/shared/components/Admin/ui/Accounts/Accounts";
import AllProposal from "@/shared/components/Admin/ui/AllProposal/AllProposal";
import CheckingReviews from "@/shared/components/Admin/ui/CheckingReviews/CheckingReviews";
import EditingDistricts from "@/shared/components/Admin/ui/EditingDistricts/EditingDistricts";
import Faq from "@/shared/components/Admin/ui/Faq/Faq";
import { IDistrict } from "@/types/core/district";
import { IUnderground } from "@/types/core/underground";
import { IFaq } from "@/types/faq/faq";





export default async function AdminModeratorModelPage({ params: { link} }: { params: { link: string } }) {
    const district: IDistrict[] = await getDistricts()
    const underground: IUnderground[] = await getUndergrounds()
    const faqs: IFaq[] = await getFaqs()




    switch (link) {
        case 'checking_reviews':
            return (
                <CheckingReviews id={link} />
            )

        case 'all_proposals':
            return (
                <AllProposal id={link} />
            )
        case 'editing_configuration':
            return (
                <EditingDistricts districts={district} undergrounds={underground} />
            )

        case 'accounts':
            return (
                <Accounts />
            )

        case 'faq':
            return (
                <Faq faqs={faqs} />
            )

        case 'pages':
            return (
                <div>Пока пусто</div>
            )
    }


}


