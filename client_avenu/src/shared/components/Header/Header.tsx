
import { cookies } from "next/headers";
import HeaderContent from "./ui/HeaderContent/HeaderContent";
import HeaderVisible from "./ui/HeaderVisible/HeaderVisible";

const Header = () => {
    const cookieStore = cookies();

    const customer = cookieStore.get("CustomerToken");
    // console.log("🚀 ~ Header ~ customer:", customer)
    const agency = cookieStore.get("AgencyToken");
    // console.log("🚀 ~ Header ~ agency:", agency)


    return (
        <HeaderVisible>
            <HeaderContent customer={customer} agency={agency}/>
        </HeaderVisible>
    );
};

export default Header;