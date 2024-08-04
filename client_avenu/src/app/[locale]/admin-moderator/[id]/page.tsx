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
import { INavigationLink } from "@/types/main/navigationLink"
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";


// export async function generateStaticParams() {
//     // const auth = await getAuthAction('AdminToken')
//     // console.log("🚀 ~ generateStaticParams ~ auth:", auth) 
//     // console.log("🚀 ~ generateStaticParams ~ auth: type", auth.type) 





//     // const linksList: Record<string, INavigationLink[]> = LinksList
//     console.log("🚀 ~ file: page.tsx:generateStaticParams ~ linksList:", LinksList[auth.type]);


//     return LinksList[auth.type].map((link: INavigationLink) => ({
//         id: link.link_url
//     }))



//     // const listLink = LinksList[auth.type]
//     // const models = await fetch('http://localhost:8001/api/models', {
//     //     method: 'GET',
//     //     next: { revalidate: 10 },
//     // }).then((res) => res.json());

//     // return models.map((model: IModel) => ({
//     //     id: String(model.id),
//     //     // id: String(model.id).padStart(8, "0"),
//     // }))


// }

export default async function AdminModeratorPage({ params: { id } }: { params: { id: string } }) {
    const district: IDistrict[] = await getDistricts()
    const underground: IUnderground[] = await getUndergrounds()
    const faqs: IFaq[] = await getFaqs()




    switch (id) {
        case 'checking_reviews':
            return (
                <CheckingReviews id={id} />
            )

        case 'all_proposals':
            return (
                <AllProposal id={id} />
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


