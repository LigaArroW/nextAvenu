'use client'

import { Person } from "@/lib/auth/authAction";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { useLocale, useTranslations } from "next-intl";
import InputMask from "react-input-mask";
import styles from '@/shared/styles/Profile.module.sass';
import { useEffect, useState } from "react";
import { ComponentType } from "@/shared/components/Home/ui/Filters/ComponentType";
import { IBlacklist } from "@/types/profile/blacklist/blacklist";
import { ICity } from "@/types/core/city";
import { ICountry } from "@/types/core/country";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { ArrowDown } from "@/shared/assets/ArrowDown";
import { Search } from "@/shared/assets/Search";
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import { useFormState } from "react-dom";
import { addToBlackListAction } from "@/lib/forms/blacklist/addToBlackListAction";


interface IAddBlackList {
    person: Person
    blacklist: IBlacklist
    cities: ICity[]
    countries: ICountry[]
}


const AddBlackList: React.FC<IAddBlackList> = ({ person, blacklist, cities, countries }) => {
    const t = useTranslations();
    const locale = useLocale();
    const [filteredCities, setFilteredCities] = useState(cities);
    const [searchedCity, setSearchedCity] = useState("");
    const [activeComponent, setActiveComponent] = useState(ComponentType.None);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [blacklistItem, setBlacklistItem] = useState<IBlacklist>({ id: 0, city_id: -1, country_id: -1, phone_number: "", description: "" } as IBlacklist);
    const [state, formAction] = useFormState(addToBlackListAction, {
        'success': false,
        'message': ''
    });
    console.log(state);
    

    useEffect(() => {
        if (state.success) {
            setIsShowModal(true);
            setInfoMessage("profile.client_added_to_blacklist");
        }
        if (!state.success) {
            setIsShowModal(true);
            setInfoMessage(state.message);
        }
    }, [state.message, state.success])



    const handlerCountryOnClick = (country: ICountry) => {
        setBlacklistItem({ ...blacklistItem, country_id: country.id, city_id: country.id === -1 ? -1 : blacklistItem.city_id });
        setActiveComponent(ComponentType.None);
    };

    const handlerCityOnClick = (city: ICity) => {
        setBlacklistItem({ ...blacklistItem, city_id: city.id });
        setActiveComponent(ComponentType.None);
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("profile.informing_about_blacklisting")}</div>
            <div className={styles.main_info}>
                <form action={formAction}>

                    <div
                        className={`${styles.dropdown} ${activeComponent === ComponentType.CountriesSelector ? styles.active : ""
                            }`}
                    >
                        <div className={styles.main}>
                            <div className={styles.label}>{t("global.country")}</div>
                            <div
                                className={styles.dropdown_button}
                                onClick={() =>
                                    setActiveComponent(
                                        activeComponent === ComponentType.CountriesSelector
                                            ? ComponentType.None
                                            : ComponentType.CountriesSelector
                                    )
                                }
                            >
                                {blacklistItem.country_id === -1
                                    ? ""
                                    : locale === "ru"
                                        ? countries.find((country: ICountry) => country.id === blacklistItem.country_id)?.country
                                        : countries.find((country: ICountry) => country.id === blacklistItem.country_id)?.country_eng}
                                {activeComponent === ComponentType.CountriesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
                            </div>
                        </div>
                        <div
                            className={`${styles.dropdown_container} ${activeComponent === ComponentType.CountriesSelector ? styles.active : ""
                                }`}
                        >
                            <div className={styles.dropdown_list}>
                                <div className={styles.dropdown_item} onClick={() => handlerCountryOnClick({ id: -1 } as ICountry)}>
                                    {t("global.not_selected")}
                                </div>
                                {countries.map((country: ICountry) => (
                                    <div key={country.id} className={styles.dropdown_item} onClick={() => handlerCountryOnClick(country)}>
                                        {locale === "ru" ? country.country : country.country_eng}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${styles.dropdown} ${activeComponent === ComponentType.CitiesSelector ? styles.active : ""
                            }`}
                    >
                        <div className={styles.main}>
                            <div className={styles.label}>{t("global.city")}</div>
                            <div
                                className={styles.dropdown_button}
                                onClick={() => {
                                    if (filteredCities.filter((city: ICity) => city.country_id === blacklistItem.country_id).length > 0)
                                        setActiveComponent(
                                            activeComponent === ComponentType.CitiesSelector ? ComponentType.None : ComponentType.CitiesSelector
                                        );
                                }}
                            >
                                {blacklistItem.city_id === -1
                                    ? ""
                                    : locale === "ru"
                                        ? cities.find((city: ICity) => city.id === blacklistItem.city_id)?.city
                                        : cities.find((city: ICity) => city.id === blacklistItem.city_id)?.city_eng}
                                {activeComponent === ComponentType.CitiesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
                            </div>
                        </div>
                        <div
                            className={
                                styles.dropdown_container +
                                " " +
                                (activeComponent === ComponentType.CitiesSelector ? styles.active : "")
                            }
                        >
                            <div className={styles.search_input}>
                                <input
                                    type="name" className={styles.search_value}
                                    placeholder={t("global.city_search")}
                                    value={searchedCity}
                                    onChange={(event) => setSearchedCity(event.target.value)}
                                />
                                <Search fill="#98042D" />
                            </div>
                            <div className={styles.dropdown_list}>
                                <div className={styles.dropdown_item} onClick={() => handlerCityOnClick({ id: -1 } as ICity)}>
                                    {t("global.not_selected_m")}
                                </div>
                                {cities
                                    .filter(
                                        (city: ICity) =>
                                            city.country_id === blacklistItem.country_id &&
                                            (searchedCity.trim().length !== 0
                                                ? city.city.toLowerCase().startsWith(searchedCity.toLowerCase()) ||
                                                city.city_eng.toLowerCase().startsWith(searchedCity.toLowerCase())
                                                : true)
                                    )
                                    .map((city: ICity) => (
                                        <div key={city.id} className={styles.dropdown_item} onClick={() => handlerCityOnClick(city)}>
                                            {locale === "ru" ? city.city : city.city_eng}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <div className={styles.label}>{t("profile.client_phone_number")}</div>
                        <InputMask
                            placeholder=""
                            type="text"
                            required
                            mask="+7 (999) 999-99-99"
                            // maskPlaceholder="0"
                            maskChar={""}
                            onChange={(event) => setBlacklistItem({ ...blacklistItem, phone_number: event.target.value.trim() })}
                            value={blacklistItem.phone_number}
                            onClick={() => setActiveComponent(ComponentType.None)}
                        />
                        <div className={styles.required}>*</div>
                    </div>
                    <div className={styles.textarea_field}>
                        <div className={styles.label}>{t("profile.description_of_the_event")}</div>
                        <textarea
                            required
                            onChange={(event) => setBlacklistItem({ ...blacklistItem, description: event.target.value.trim() })}
                            value={blacklistItem.description}
                            onClick={() => setActiveComponent(ComponentType.None)}
                        />
                        <div className={styles.required}>*</div>
                    </div>
                    <input type="hidden" value={blacklistItem.id} name="id" />
                    <input type="hidden" value={blacklistItem.city_id} name="city" />
                    <input type="hidden" value={blacklistItem.country_id} name="country" />
                    <input type="hidden" value={blacklistItem.description} name="description" />
                    <input type="hidden" value={blacklistItem.phone_number} name="phone" />
                    <input type="hidden" value={person._id} name="agency_id" />
                    {/* <button type="submit" disabled={!isButtonEnabled}>
                        {t("global.send")}
                    </button> */}
                    <ButtonSubmitForm
                        text="global.send"
                        disabled={(blacklistItem.phone_number.length === 18 && blacklistItem.description.trim() !== "") ? false : true}
                    />
                </form>
            </div>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsShowModal(false)}

            />}
        </div>
    );
};

export default AddBlackList;