'use client'
import { usePathName } from "@/shared/hooks/usePathName";
import { PropsWithChildren } from "react";
const HeaderVisible: React.FC<PropsWithChildren> = ({ children }) => {
    const pathName = usePathName();

    if (pathName.startsWith("/admin-moderator") || pathName.startsWith("/admin-4c458ba3adfa8005a9df1c8fa74e28e0")) {

        return null
    }
    return (
        <>
            {children}
        </>
    );
};

export default HeaderVisible;