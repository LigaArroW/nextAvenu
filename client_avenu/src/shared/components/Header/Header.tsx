import { useTranslations } from "next-intl";
import HeaderContnent from "./ui/HeaderContent/HeaderContent";
import HeaderVisible from "./ui/HeaderVisible/HeaderVisible";

const Header = () => {
    return (
        <HeaderVisible>
            <HeaderContnent />
        </HeaderVisible>
    );
};

export default Header;