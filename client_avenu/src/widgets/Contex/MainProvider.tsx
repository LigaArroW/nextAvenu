'use client'
import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";

interface IMainContext {
    searchedModel: string;
    setSeachedModel: Dispatch<SetStateAction<string>>;
    resetContext: () => void
}
interface IMainProviderProps {
    children: React.ReactNode
}

const MainContext = createContext<IMainContext>({} as IMainContext);
export const useMainContext = () => useContext(MainContext);
export const MainProvider: FC<IMainProviderProps> = ({ children }) => {
    const [searchedModel, setSeachedModel] = useState<string>("");


    const resetContext = () => {
        setSeachedModel("");
    }
    return (
        <MainContext.Provider
            value={{
                searchedModel,
                setSeachedModel,
                resetContext
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

