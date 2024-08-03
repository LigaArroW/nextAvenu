"use client"
import {PropsWithChildren, useEffect, useState} from "react"
import { createPortal } from "react-dom"

const Portal = ({ children }: PropsWithChildren) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])
    return mounted && createPortal(children, document.querySelector("#modal-portal") as unknown as DocumentFragment)
}

export default Portal