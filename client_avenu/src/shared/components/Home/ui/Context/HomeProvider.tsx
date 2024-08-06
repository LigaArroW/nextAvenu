'use client'

import { ICountry } from "@/types/core/country";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { ViewType } from "../ViewType";



interface IHomeContext {
    searchedModel: string;
    setSeachedModel: Dispatch<SetStateAction<string>>;
    selectedCountry: ICountry;
    setSelectedCountry: Dispatch<SetStateAction<ICountry>>;
    modelTypes: number[]
    setModelTypes: Dispatch<SetStateAction<number[]>>
    countries: number[]
    setCountries: Dispatch<SetStateAction<number[]>>
    cities: number[]
    setCities: Dispatch<SetStateAction<number[]>>
    districts: number[]
    setDistricts: Dispatch<SetStateAction<number[]>>
    undergrounds: number[]
    setUndergrounds: Dispatch<SetStateAction<number[]>>
    minAge: number
    setMinAge: Dispatch<SetStateAction<number>>
    maxAge: number
    setMaxAge: Dispatch<SetStateAction<number>>
    hairColors: number[]
    setHairColors: Dispatch<SetStateAction<number[]>>
    hairSizes: number[]
    setHairSizes: Dispatch<SetStateAction<number[]>>
    pubisHairs: number[]
    setPubisHairs: Dispatch<SetStateAction<number[]>>
    breastSizes: number[]
    setBreastSizes: Dispatch<SetStateAction<number[]>>
    breastTypes: number[]
    setBreastTypes: Dispatch<SetStateAction<number[]>>
    trips: number[]
    setTrips: Dispatch<SetStateAction<number[]>>
    minWeight: number
    setMinWeight: Dispatch<SetStateAction<number>>
    maxWeight: number
    setMaxWeight: Dispatch<SetStateAction<number>>
    minHeight: number
    setMinHeight: Dispatch<SetStateAction<number>>
    maxHeight: number
    setMaxHeight: Dispatch<SetStateAction<number>>
    meetingPlaces: number[]
    setMeetingPlaces: Dispatch<SetStateAction<number[]>>
    services: number[]
    setServices: Dispatch<SetStateAction<number[]>>
    ethnicGroups: number[]
    setEthnicGroups: Dispatch<SetStateAction<number[]>>
    nationalities: number[]
    setNationalities: Dispatch<SetStateAction<number[]>>
    languages: number[]
    setLanguages: Dispatch<SetStateAction<number[]>>
    smookers: number[]
    setSmookers: Dispatch<SetStateAction<number[]>>
    piercings: number[]
    setPiercings: Dispatch<SetStateAction<number[]>>
    tatoos: number[]
    setTatoos: Dispatch<SetStateAction<number[]>>
    eyesColors: number[]
    setEyesColors: Dispatch<SetStateAction<number[]>>
    orientations: number[]
    setOrientations: Dispatch<SetStateAction<number[]>>
    tarifs: number[][]
    setTarifs: Dispatch<SetStateAction<number[][]>>
    resetContext: () => void
    viewType: ViewType
    setViewType: Dispatch<SetStateAction<ViewType>>
    isFiltersActive: boolean
    setIsFiltersActive: Dispatch<SetStateAction<boolean>>

}
// interface IDepositProviderProps extends PropsWithChildren {
//     tabs: IDepositTypeItems;
//   }
interface IHomeProviderProps {
    children: React.ReactNode
}

const HomeContext = createContext<IHomeContext>({} as IHomeContext);
export const useHomeContext = () => useContext(HomeContext);

export const HomeProvider: FC<IHomeProviderProps> = ({ children }) => {
    const [searchedModel, setSeachedModel] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<ICountry>({} as ICountry);
    const [modelTypes, setModelTypes] = useState<number[]>([]);
    const [countries, setCountries] = useState<number[]>([]);
    const [cities, setCities] = useState<number[]>([]);
    const [districts, setDistricts] = useState<number[]>([]);
    const [undergrounds, setUndergrounds] = useState<number[]>([]);
    const [minAge, setMinAge] = useState<number>(18);
    const [maxAge, setMaxAge] = useState<number>(65);
    const [hairColors, setHairColors] = useState<number[]>([]);
    const [hairSizes, setHairSizes] = useState<number[]>([]);
    const [pubisHairs, setPubisHairs] = useState<number[]>([]);
    const [breastSizes, setBreastSizes] = useState<number[]>([]);
    const [breastTypes, setBreastTypes] = useState<number[]>([]);
    const [trips, setTrips] = useState<number[]>([]);
    const [minWeight, setMinWeight] = useState<number>(40);
    const [maxWeight, setMaxWeight] = useState<number>(125);
    const [minHeight, setMinHeight] = useState<number>(150);
    const [maxHeight, setMaxHeight] = useState<number>(220);
    const [meetingPlaces, setMeetingPlaces] = useState<number[]>([]);
    const [services, setServices] = useState<number[]>([]);
    const [ethnicGroups, setEthnicGroups] = useState<number[]>([]);
    const [nationalities, setNationalities] = useState<number[]>([]);
    const [languages, setLanguages] = useState<number[]>([]);
    const [smookers, setSmookers] = useState<number[]>([]);
    const [piercings, setPiercings] = useState<number[]>([]);
    const [tatoos, setTatoos] = useState<number[]>([]);
    const [eyesColors, setEyesColors] = useState<number[]>([]);
    const [orientations, setOrientations] = useState<number[]>([]);
    const [tarifs, setTarifs] = useState<number[][]>([]);
    const [viewType, setViewType] = useState<ViewType>(ViewType.ListView);
    const [isFiltersActive, setIsFiltersActive] = useState<boolean>(false);

    const resetContext = () => {
        setSeachedModel("");
        setSelectedCountry({} as ICountry);
        setModelTypes([]);
        setCountries([]);
        setCities([]);
        setDistricts([]);
        setUndergrounds([]);
        setMinAge(18);
        setMaxAge(65);
        setHairColors([]);
        setHairSizes([]);
        setPubisHairs([]);
        setBreastSizes([]);
        setBreastTypes([]);
        setTrips([]);
        setMinWeight(40);
        setMaxWeight(125);
        setMinHeight(150);
        setMaxHeight(220);
        setMeetingPlaces([]);
        setServices([]);
        setEthnicGroups([]);
        setNationalities([]);
        setLanguages([]);
        setSmookers([]);
        setPiercings([]);
        setTatoos([]);
        setEyesColors([]);
        setOrientations([]);
        setTarifs([]);
    }


    return <HomeContext.Provider value={{
        searchedModel,
        setSeachedModel,
        selectedCountry,
        setSelectedCountry,
        modelTypes,
        setModelTypes,
        countries,
        setCountries,
        cities,
        setCities,
        districts,
        setDistricts,
        undergrounds,
        setUndergrounds,
        minAge,
        setMinAge,
        maxAge,
        setMaxAge,
        hairColors,
        setHairColors,
        hairSizes,
        setHairSizes,
        pubisHairs,
        setPubisHairs,
        breastSizes,
        setBreastSizes,
        breastTypes,
        setBreastTypes,
        trips,
        setTrips,
        minWeight,
        setMinWeight,
        maxWeight,
        setMaxWeight,
        minHeight,
        setMinHeight,
        maxHeight,
        setMaxHeight,
        meetingPlaces,
        setMeetingPlaces,
        services,
        setServices,
        ethnicGroups,
        setEthnicGroups,
        nationalities,
        setNationalities,
        languages,
        setLanguages,
        smookers,
        setSmookers,
        piercings,
        setPiercings,
        tatoos,
        setTatoos,
        eyesColors,
        setEyesColors,
        orientations,
        setOrientations,
        tarifs,
        setTarifs,
        resetContext,
        viewType,
        setViewType,
        isFiltersActive,
        setIsFiltersActive

    }}>{children}</HomeContext.Provider>

};


