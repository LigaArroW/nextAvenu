'use client';

import { useRouter } from "next/navigation";
import { ElementType } from "react";

interface IRouterBack {
    styles: string;
    As?: ElementType
    text: string
}

export const RouterBack: React.FC<IRouterBack> = ({ styles, text, As = 'div' }) => {
    const router = useRouter();
    return (
        <As className={styles} onClick={() => router.back()}>
            {text}
        </As>
    );
}