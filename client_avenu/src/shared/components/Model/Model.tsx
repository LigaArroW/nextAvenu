import { IDayOfWeek } from "@/types/core/dayOfWeek";
import { IGeneral } from "@/types/core/generalFilters";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { IService } from "@/types/core/service";
import { IServiceCategory } from "@/types/core/serviceCategory";
import { IWorkDuration } from "@/types/core/workDuration";
import { IModel } from "@/types/model/model/model";
import { IModelService } from "@/types/model/modelService/modelService";
import { ITarif } from "@/types/model/tarif/tarif";
import { IWorkTime } from "@/types/model/workTime/workTime";
import styles from '@/shared/styles/Model.module.sass'
import { calcIsOnline } from "@/shared/constant/calcIsOnline";
import { getLocale, getTranslations } from "next-intl/server";
import { Location } from "@/shared/assets/Location";
import { IDistrict } from "@/types/core/district";
import { IContact } from "@/types/model/contact/contact";
import { Phone } from "@/shared/assets/Phone";
import { Telegram } from "@/shared/assets/Telegram";
import { Whatsapp } from "@/shared/assets/Whatsapp";
import { Wechat } from "@/shared/assets/Wechat";
import { Botim } from "@/shared/assets/Botim";
import { ICountry } from "@/types/core/country";
import { IUnderground } from "@/types/core/underground";
import { IMeeting } from "@/types/core/meeting";
import { IModelType } from "@/types/core/modelType";
import { IOrientation } from "@/types/core/orientation";
import { IBreastSize } from "@/types/core/breastSize";
import { IBreastType } from "@/types/core/breastType";
import { IHairColor } from "@/types/core/hairColor";
import { IHairSize } from "@/types/core/hairSize";
import { IEthnicGroup } from "@/types/core/ethnicGroup";
import { INationality } from "@/types/core/nationality";
import { ILanguage } from "@/types/model/language/language";
import { IModelLanguage } from "@/types/model/language/modelLanguage";
import { ITrip } from "@/types/core/trip";
import { ITatoo } from "@/types/core/tatoo";
import { IModelPiercing } from "@/types/model/piercing/modelPiercing";
import { IPiercing } from "@/types/model/piercing/piercing";
import { ISmooker } from "@/types/core/smooker";
import { IEyesColor } from "@/types/core/eyesColor";
import { IPubisHair } from "@/types/core/pubisHair";
import { Close } from "@/shared/assets/Close";
import { ICurrency } from "@/types/core/currency";
import { Check } from "@/shared/assets/Check";
import { RouterBack } from "@/widgets/routerBack/routerBack";
import WindowsInner from "@/widgets/WindowsInner/WindowsInner";
import Media from "./content/media/Media";
import TextArea from "./forModerator/TextArea";
import PhoneNumber from "./PhoneNumber/PhoneNumber";
import Link from "next/link";
import { changePhoneNumber } from "@/shared/constant/changePhoneNumber";
import ModeratorControl from "./forModerator/ModeratorControl";
import { IPhoto } from "@/types/model/photo/photo";
import { PhotoType } from "@/enums/photoType";
import { PhotoStatus } from "@/enums/photoStatus";
import FeedbacksContent from "./content/feedback/Feedback";
import Image from "next/image";
import { Person } from "@/lib/auth/authAction";





interface IModelComponent {
  filtredFields: Partial<IGeneral>;
  model: IModel;
  forModerator: boolean
  person: Person
}

async function getPhotoArray(model: IModel) {
  const photoModel = model.photos.filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)

  const photoArray = await Promise.all(photoModel.map(async (photo: IPhoto) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`).then((res) => res.url)
  }));
  return photoArray
}



const Model: React.FC<IModelComponent> = async ({ forModerator = false, filtredFields, model, person }) => {
  const t = await getTranslations();
  const locale = await getLocale();

  const photoArray = await getPhotoArray(model);


  let tmpServices = [] as IModelService[]
  let tmpWorkTimes = [] as IWorkTime[];
  let tmpTarifs = [] as ITarif[];


  if (filtredFields.service_categories && filtredFields.service_categories.length > 0 && model.model_services) {
    filtredFields.service_categories.map((serviceCategory: IServiceCategory) =>
      serviceCategory.services.map((service: IService) =>
        tmpServices.push({
          id:
            model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
              ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.id
              : model.model_services.length === 0
                ? service.id
                : Math.max(...model.model_services.map((modelService: IModelService) => modelService.id)) + service.id,
          category_id: serviceCategory.id,
          service_id: service.id,
          model_id: model.id,
          price:
            model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
              ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.price
              : -1,
        })
      ))

  }

  if (filtredFields.days_of_week && filtredFields.days_of_week.length > 0 && model.work_times) {
    filtredFields.days_of_week.map((dayOfWeek: IDayOfWeek) =>
      tmpWorkTimes.push(
        model.work_times.filter(
          (workTime: IWorkTime) => workTime.model_id === model.id && workTime.day_of_week_id === dayOfWeek.id
        ).length > 0
          ? (model.work_times.find(
            (workTime: IWorkTime) => workTime.model_id === model.id && workTime.day_of_week_id === dayOfWeek.id
          ) as IWorkTime)
          : ({
            id:
              model.work_times.length === 0
                ? dayOfWeek.id
                : Math.max(...model.work_times.map((workTime: IWorkTime) => workTime.id)) + dayOfWeek.id,
            time_start: "",
            time_end: "",
            model_id: model.id,
            day_of_week_id: dayOfWeek.id,
            is_all_day: false,
          })
      ));

  }

  if (filtredFields.meeting_places && filtredFields.meeting_places.length > 0 && filtredFields.work_durations && filtredFields.work_durations.length > 0 && model.tarifs) {
    const meetingPlace = filtredFields.meeting_places.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
    filtredFields.meeting_places.map((meetingPlace: IMeetingPlace) => {
      filtredFields.work_durations && filtredFields.work_durations.map((workDuration: IWorkDuration) => {
        tmpTarifs.push(
          model.tarifs.filter(
            (tariff: ITarif) => tariff.meeting_place_id === meetingPlace.id && tariff.work_duration_id === workDuration.id
          ).length > 0
            ? (model.tarifs.find(
              (tariff: ITarif) =>
                tariff.meeting_place_id === meetingPlace.id && tariff.work_duration_id === workDuration.id
            ) as ITarif)
            : ({
              id:
                model.tarifs.length === 0
                  ? (meetingPlace.id + 10) * (workDuration.id + 1) + workDuration.id
                  : Math.max(...model.tarifs.map((tarif: ITarif) => tarif.id)) +
                  (meetingPlace.id + 10) * (workDuration.id + 1) +
                  workDuration.id,
              meeting_place_id: meetingPlace.id,
              work_duration_id: workDuration.id,
              price: 0,
              model_id: model.id,
            } as ITarif)
        );
      });
    })
    meetingPlace?.meeting_place == "Аппартаменты" || meetingPlace?.meeting_place == "Выезд"
      ? tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id === meetingPlace?.id)
      : tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id !== meetingPlace?.id)

  }


  return (
    <>
      {
        forModerator ? <RouterBack styles={styles.previous_page_button} text="< Предыдущая страница" /> : null
      }


      {model.name !== '' && (

        <div className={styles.wrapper_content}>
          {/* {windowSize.innerWidth > 1450 && <Media model={model} />} */}
          {/* <WindowsInner innerWidth="1450" maxMinWidth="min"> */}
          <div className={`${styles.media}  ${styles.NotMobile}`} >
            <Media model={model} photos={photoArray} />
          </div>
          {/* </WindowsInner> */}

          <div className={styles.info}>
            <div className={styles.name}>
              {/* <WindowsInner innerWidth="1450" maxMinWidth='max'> */}
              <div className={`${styles.statuses} ${styles.Mobile}`}>
                {model.is_vip ? <div className={styles.empty_vip} /> : null}
                <div className={styles.empty_online} />
              </div>
              {/* </WindowsInner> */}
              {/* {windowSize.innerWidth < 1451 && (
                <div className={styles.statuses}>
                  {model.is_vip ? <div className={styles.empty_vip} /> : null}
                  <div className={styles.empty_online} />
                </div>
              )} */}
              {model.name}
              <div className={styles.statuses}>
                {model.is_vip ? <div className={styles.vip}>VIP</div> : ""}
                <div
                  className={`${calcIsOnline(model) ? styles.online : styles.offline}`}
                  title={calcIsOnline(model) ? t("model.online") : t("model.offline")}
                />
              </div>
            </div>
            <div className={styles.location}>
              <Location fill="#98042D" />
              {model.district_id === -1
                ? t("global.not_specified_m")
                : locale === "ru"
                  ? filtredFields.districts && filtredFields.districts.find((district: IDistrict) => district.id === model.district_id)?.district
                  : filtredFields.districts && filtredFields.districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
            </div>
            {/* {windowSize.innerWidth < 1451 && <Media model={model} />} */}
            {/* <WindowsInner innerWidth="1450" maxMinWidth="max">
              <Media model={model} photos={photoArray} />
            </WindowsInner> */}
            <div className={`${styles.media} ${styles.Mobile}`} >
              <Media model={model} photos={photoArray} />
            </div>
            {model.about_self !== "" && (
              <div className={styles.about_self}>
                <span>{t("model.about_me")}</span>
                {
                  forModerator
                    // ? <textarea
                    //   className={styles.about_self_content}
                    //   placeholder=""
                    // // onChange={(event) => updateAboutData(event.target.value)}
                    // // value={modelAbout}
                    // />
                    ? <TextArea model={model} style={styles.about_self_content}

                    />
                    : <div className={styles.about_self_content}>
                      <i>{model.about_self}</i>
                    </div>
                }
              </div>
            )}
            <div className={styles.parts}>
              <div className={styles.part + " " + styles.full_width}>
                {t("model.detailed_information")}
                <div className={styles.content}>
                  {model.contacts.map((contact: IContact) => (
                    <div key={contact.id} className={styles.contacts}>
                      <PhoneNumber contact={contact} phone={styles.phone} phone_show={styles.phone_show} />
                      <div className={styles.messengers}>
                        {contact.is_telegram_enable ? (
                          <Link
                            href={`https://t.me/+${changePhoneNumber(contact.phone_number)}`}
                            target="_blank"
                            title={t("model.write_to_telegram")}
                          >
                            <Telegram isGray={false} />
                          </Link>
                        ) : null}
                        {contact.is_whatsapp_enable ? (
                          <Link
                            href={`https://api.whatsapp.com/send/?phone=${changePhoneNumber(contact.phone_number)}`}
                            target="_blank"
                            title={t("model.write_to_whatsapp")}
                          >
                            <Whatsapp isGray={false} />
                          </Link>
                        ) : null}
                        {contact.is_wechat_enable ? (
                          <div title={t("model.has_a_wechat")}>
                            <Wechat isGray={false} />
                          </div>
                        ) : null}
                        {contact.is_botim_enable ? (
                          <div title={t("model.has_a_botim")}>
                            <Botim isGray={false} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <div className={styles.parameters}>
                    <div className={styles.parameter}>
                      {t("global.country")}:
                      <div className={styles.value}>
                        {model.country_id === -1
                          ? t("global.not_specified")
                          : locale === "ru"
                            ? filtredFields.countries && filtredFields.countries.find((country: ICountry) => country.id === model.country_id)?.country
                            : filtredFields.countries && filtredFields.countries.find((country: ICountry) => country.id === model.country_id)?.country_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("global.city")}:
                      <div className={styles.value}>
                        {model.city_id === -1
                          ? t("global.not_specified_m")
                          : locale === "ru"
                            ? process.env.SITE_CITY
                            : process.env.SITE_CITY_ENG
                          //  ? cities.find((city: ICity) => city.id === model.city_id)?.city
                          // : cities.find((city: ICity) => city.id === model.city_id)?.city_eng
                        }
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("global.district")}:
                      <div className={styles.value}>
                        {model.district_id === -1
                          ? t("global.not_specified_m")
                          : locale === "ru"
                            ? filtredFields.districts && filtredFields.districts.find((district: IDistrict) => district.id === model.district_id)?.district
                            : filtredFields.districts && filtredFields.districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("global.underground")}:
                      <div className={styles.value}>
                        {model.underground_id === -1
                          ? t("global.not_specified_s")
                          : locale === "ru"
                            ? filtredFields.undergrounds && filtredFields.undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)
                              ?.underground
                            : filtredFields.undergrounds && filtredFields.undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)
                              ?.underground_eng}
                      </div>
                    </div>
                    {model.meeting_id !== -1 && (
                      <div className={styles.parameter}>
                        {t("model.meeting_with")}:
                        <div className={styles.value}>
                          {locale === "ru"
                            ? filtredFields.meetings && filtredFields.meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting
                            : filtredFields.meetings && filtredFields.meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting_eng}
                        </div>
                      </div>
                    )}
                    <div className={styles.parameter}>
                      {t("model.age")}:<div className={styles.value}>{model.age}</div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.weight")}:
                      <div className={styles.value}>
                        {model.weight} {t("model.kg")}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.height")}:
                      <div className={styles.value}>
                        {model.height} {t("model.cm")}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.model_type")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.model_types && filtredFields.model_types.find((modelType: IModelType) => modelType.id === model.type_id)?.type
                          : filtredFields.model_types && filtredFields.model_types.find((modelType: IModelType) => modelType.id === model.type_id)?.type_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.orientation")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.orientations && filtredFields.orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)
                            ?.orientation
                          : filtredFields.orientations && filtredFields.orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)
                            ?.orientation_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.breast")}:
                      <div className={styles.value}>
                        {`${filtredFields.breast_sizes && filtredFields.breast_sizes.find((breasSize: IBreastSize) => breasSize.id === model.breast_size_id)?.breast_size
                          } ${locale === "ru"
                            ? filtredFields.breast_types && filtredFields.breast_types.find((breastType: IBreastType) => breastType.id === model.breast_type_id)
                              ?.breast_type
                            : filtredFields.breast_types && filtredFields.breast_types.find((breastType: IBreastType) => breastType.id === model.breast_type_id)
                              ?.breast_type_eng
                          }`}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.hair_color")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.hair_colors && filtredFields.hair_colors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color
                          : filtredFields.hair_colors && filtredFields.hair_colors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.hair_size")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.hair_sizes && filtredFields.hair_sizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size
                          : filtredFields.hair_sizes && filtredFields.hair_sizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.ethnic_group")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.ethnic_groups && filtredFields.ethnic_groups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)
                            ?.ethnic_group
                          : filtredFields.ethnic_groups && filtredFields.ethnic_groups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)
                            ?.ethnic_group_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.nationality")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.nationalities && filtredFields.nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)
                            ?.nationality
                          : filtredFields.nationalities && filtredFields.nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)
                            ?.nationality_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.language")}:
                      {model.model_languages.length === 0 ? (
                        <div className={styles.value}>{t("global.not_specified_m")}</div>
                      ) : (
                        <div className={styles.value}>
                          {
                            model.model_languages.filter((modelLanguage: IModelLanguage) =>
                              filtredFields.languages && filtredFields.languages.find((language: ILanguage) => language.id === modelLanguage.language_id)
                              ?.[locale === "ru" ? "language" : "language_eng"]
                            ).map(
                              (modelLanguage: IModelLanguage, index: number) =>
                                `${index ? " | " : ""} ${filtredFields.languages && filtredFields.languages.find((language: ILanguage) => language.id === modelLanguage.language_id)
                                ?.[locale === "ru" ? "language" : "language_eng"]}`
                            )
                          }
                        </div>
                      )}
                    </div>
                    <div className={styles.parameter}>
                      {t("model.trips")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.trips && filtredFields.trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip
                          : filtredFields.trips && filtredFields.trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.tattoo")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.tatoos && filtredFields.tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo
                          : filtredFields.tatoos && filtredFields.tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.piercing")}:
                      <div className={styles.value}>
                        {model.model_piercings.map(
                          (modelPiercing: IModelPiercing, index: number) =>
                            `${index ? " | " : ""} ${locale === "ru"
                              ? filtredFields.piercings && filtredFields.piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                                ?.piercing
                              : filtredFields.piercings && filtredFields.piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                                ?.piercing_eng
                            }`
                        )}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.smoker")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.smookers && filtredFields.smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker
                          : filtredFields.smookers && filtredFields.smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.eyes_color")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.eyes_colors && filtredFields.eyes_colors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color
                          : filtredFields.eyes_colors && filtredFields.eyes_colors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.pubic_hair")}:
                      <div className={styles.value}>
                        {locale === "ru"
                          ? filtredFields.pubis_hairs && filtredFields.pubis_hairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair
                          : filtredFields.pubis_hairs && filtredFields.pubis_hairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair_eng}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.parts}>
              <div className={styles.part}>
                {t("model.working_hours")}
                <table className={'table'}>
                  <thead className={'borderer'}>
                    <tr className={'borderer'}>
                      <th style={{ width: "50%" }}>{t("model.day_of_the_week")}</th>
                      <th style={{ width: "25%" }} className={'borderer'}>
                        {t("global.from")}
                      </th>
                      <th style={{ width: "25%" }} className={'borderer'}>
                        {t("global.before")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className={'borderer'}>
                    {tmpWorkTimes.map((workTime: IWorkTime) => (
                      <tr key={workTime.id}>
                        <td style={{ width: "50%" }}>
                          {locale === "ru"
                            ? filtredFields.days_of_week && filtredFields.days_of_week.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)?.day_of_week
                            : filtredFields.days_of_week && filtredFields.days_of_week.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)
                              ?.day_of_week_eng}
                        </td>
                        {workTime.time_end === "" && workTime.time_start === "" && workTime.is_all_day === false && (
                          <td
                            style={{ width: "calc(50% + 16.5px)", textAlign: "center" }}
                            colSpan={2}
                            className={'borderer'}
                          >
                            <Close fill="#98042D" />
                          </td>
                        )}
                        {workTime.is_all_day ? (
                          <td
                            style={{ width: "calc(50% + 16.5px)", textAlign: "center" }}
                            colSpan={2}
                            className={'borderer'}
                          >
                            {t("model.all_day")}
                          </td>
                        ) : null}
                        {(workTime.time_end !== "" || workTime.time_start !== "") && (
                          <td style={{ width: "25%", textAlign: "center" }} className={'borderer'}>
                            {workTime.time_start}
                          </td>
                        )}
                        {(workTime.time_end !== "" || workTime.time_start !== "") && (
                          <td style={{ width: "25%", textAlign: "center" }} className={'borderer'}>
                            {workTime.time_end}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.part}>
                {t("model.tariffs")}
                <table className={'table'}>
                  <thead className={'borderer'}>
                    <tr className={'borderer'}>
                      <th style={{ width: "30%" }} />
                      {filtredFields.meeting_places && filtredFields.meeting_places
                        .filter(
                          (meetingPlace: IMeetingPlace) =>
                            meetingPlace.meeting_place === "Аппартаменты" || meetingPlace.meeting_place === "Выезд"
                        )
                        .map((meetingPlace: IMeetingPlace) => (
                          <th key={meetingPlace.id} style={{ width: "35%" }} className={'borderer'}>
                            {locale === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className={'borderer'}>
                    {filtredFields.work_durations && filtredFields.work_durations.map((workDuration: IWorkDuration) => (
                      <tr key={workDuration.id}>
                        <td style={{ width: "30%" }}>
                          {locale === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                        </td>
                        {filtredFields.meeting_places && filtredFields.meeting_places
                          .filter(
                            (meetingPlace: IMeetingPlace) =>
                              meetingPlace.meeting_place === "Аппартаменты" || meetingPlace.meeting_place === "Выезд"
                          )
                          .map((meetingPlace: IMeetingPlace) => (
                            <td key={meetingPlace.id} style={{ width: "35%", textAlign: "center" }} className={'borderer'}>
                              {tmpTarifs.find(
                                (tarif: ITarif) =>
                                  tarif.work_duration_id === workDuration.id && tarif.meeting_place_id === meetingPlace.id
                              )?.price === undefined ||
                                tmpTarifs.find(
                                  (tarif: ITarif) =>
                                    tarif.work_duration_id === workDuration.id && tarif.meeting_place_id === meetingPlace.id
                                )?.price === 0 ? (
                                <Close fill="#98042D" />
                              ) : (
                                tmpTarifs.find(
                                  (tarif: ITarif) =>
                                    tarif.work_duration_id === workDuration.id && tarif.meeting_place_id === meetingPlace.id
                                )?.price +
                                " " +
                                filtredFields.currencies!.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol
                              )}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.services}>
              {t("model.services")}
              <div className={styles.services_wrapper}>
                {filtredFields.service_categories && filtredFields.service_categories.map((serviceCategory: IServiceCategory) => (
                  <div key={serviceCategory.id} className={styles.services_group}>
                    <div className={styles.group_name}>
                      {locale === "ru"
                        ? serviceCategory.service_category
                        : serviceCategory.service_category_eng}
                    </div>
                    <div className={styles.services_list}>
                      {tmpServices
                        .filter((modelService: IModelService) => modelService.category_id === serviceCategory.id)
                        .map((modelService: IModelService) => (
                          <div key={modelService.id} className={styles.service}>
                            {modelService.price > -1 ? <Check fill="#98042D" /> : <Close fill="#8B8B8B" />}
                            <div className={styles.service_item + " " + (modelService.price === -1 && styles.disabled)}>
                              {locale === "ru"
                                ? serviceCategory.services.find(
                                  (service: IService) => service.id === modelService.service_id
                                )?.service
                                : serviceCategory.services.find(
                                  (service: IService) => service.id === modelService.service_id
                                )?.service_eng}
                            </div>
                            {modelService.price === 0 && <div className={styles.avaliable}>{t("model.avaliable")}</div>}
                            {modelService.price > 0 && (
                              <div className={styles.for_money}>
                                +{modelService.price}{" "}
                                {filtredFields.currencies && filtredFields.currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <FeedbacksContent model={model} person={person} />
          </div>
          <ModeratorControl model={model} forModerator={forModerator} />
          {/* {forModerator ? <div className={styles.moderator_control}>
            <div className={styles.toggle_wrapper}>
              <div
                className={`${styles.toggle} ${!!isModelEnable ? styles.active : ""}`}
                onClick={() => updateModel({ ...model, is_enable: true })}
              >
                Включить
              </div>
              <div
                className={`${styles.toggle} ${!isModelEnable ? styles.active : ""}`}
                onClick={() => updateModel({ ...model, is_enable: false })}
              >
                Выключить
              </div>
            </div>
          </div> : null} */}
        </div>
      )}


    </>

  );
};

export default Model;
