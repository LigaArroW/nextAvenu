'use client'
import { usePathname } from "next/navigation"

export const usePathName = () => {
    const pathname = usePathname();
    const newPath = pathname.split("/").slice(2).join("/")
    
    return '/' + newPath


}