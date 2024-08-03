'use client';

import { useMedia } from "react-use"

enum MaxMinWidth {
    'max',
    'min'
}

interface IWindowsInner {
    innerWidth: string
    children: React.ReactNode
    maxMinWidth: keyof typeof MaxMinWidth
}

const WindowsInner: React.FC<IWindowsInner> = ({ innerWidth, children, maxMinWidth }) => {
    const inner = useMedia(`(${maxMinWidth}-width: ${innerWidth}px)`);


    return (
        <>
            {inner && children}
        </>
    )
}

export default WindowsInner