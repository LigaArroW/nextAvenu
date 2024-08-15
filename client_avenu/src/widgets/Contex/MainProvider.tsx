'use client'
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";

interface IMainContext {
    searchedModel: string;
    setSeachedModel: Dispatch<SetStateAction<string>>;
    resetContext: () => void,
    width: number
}
interface IMainProviderProps {
    children: React.ReactNode
}

const MainContext = createContext<IMainContext>({} as IMainContext);
export const useMainContext = () => useContext(MainContext);
export const MainProvider: FC<IMainProviderProps> = ({ children }) => {
    const [searchedModel, setSeachedModel] = useState<string>("");
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
        typeof window !== 'undefined' && window.addEventListener("resize", handleResize);
        return () => { typeof window !== 'undefined' && window.removeEventListener("resize", handleResize) };
    }, []);


    const resetContext = () => {
        setSeachedModel("");
    }
    return (
        <MainContext.Provider
            value={{
                searchedModel,
                setSeachedModel,
                resetContext,
                width
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

