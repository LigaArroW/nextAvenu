'use client'


import { useMemo, useState } from "react";


import styles from "@/shared/styles/HomeModel.module.sass";



import { Verifyed } from "@/shared/assets/Verifyed";
import { PhotoCamera } from "@/shared/assets/PhotoCamera";
import { VideoCamera } from "@/shared/assets/VideoCamera";
import { Car } from "@/shared/assets/Car";
import { Home } from "@/shared/assets/Home";
import { Phone } from "@/shared/assets/Phone";
import { Telegram } from "@/shared/assets/Telegram";
import { Whatsapp } from "@/shared/assets/Whatsapp";
import { Botim } from "@/shared/assets/Botim";
import { Wechat } from "@/shared/assets/Wechat";
import { Eye } from "@/shared/assets/Eye";
import { Location } from "@/shared/assets/Location";
import { IModel } from "@/types/model/model/model";
import { ViewType } from "../Home/ui/ViewType";
import { useLocale, useTranslations } from "next-intl";
import { IPhoto } from "@/types/model/photo/photo";
import Image from "next/image";
import { IDistrict } from "@/types/core/district";
import { IGeneral } from "@/types/core/generalFilters";
import { IBreastSize } from "@/types/core/breastSize";
import { PhotoType } from "@/enums/photoType";
import { PhotoStatus } from "@/enums/photoStatus";
import { IVideo } from "@/types/model/video/video";
import { VideoStatus } from "@/enums/videoStatus";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface IHomeModelProps {
  model: IModel;
  viewType: ViewType;
  forModerator: boolean;
  filterList: Partial<IGeneral>
}

const HomeModel: React.FC<IHomeModelProps> = ({ model, viewType, forModerator = false, filterList }) => {
  const t = useTranslations();
  const [isPhoneShowed, setIsPhoneShowed] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const calcIsOnline = () => {
    const now = new Date();
    const lastOnline = new Date(model.last_online);
    const difference = Math.abs(now.getTime() - lastOnline.getTime()) / (1000 * 60);
    return difference < 3;
  };
  const isOnline = useMemo(() => calcIsOnline(), [model]);

  const makeHiddenPhoneNumber = (phoneNumber: string) => {
    var replacedStr = phoneNumber.substring(9, 15);
    return phoneNumber.replace(replacedStr, "XXX-XX");
  };
  const changePhoneNumber = (phoneNumber: string) => {
    return phoneNumber
      .trim()
      .replaceAll(" ", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll("+", "");
  };

  const getThumbUrl = (photoUrl: string) => {
    return photoUrl.replace("photos", "photos");
  };

  return (
    <div
      className={`${styles.model} ${viewType === ViewType.GridView ? styles.grid_model : styles.list_model}`}
      onClick={() => router.push((forModerator ? `${locale}/admin-moderator` : `${locale}`) + `/model/${String(model.id)}`)}
    >
      {model.photos.filter((photo: IPhoto) => photo.is_main).length > 0 && (
        <div className={styles.photo}>

          <Image src={`http://localhost:8001/api/photos/${(model.photos[0]?.photo_url)?.split('/')[3]}`}
            className={styles.photo}
            alt={model.name}
            width={180}
            height={250}
            priority
            onClick={() => router.push((forModerator ? `${locale}/admin-moderator` : `${locale}`) + `/model/${String(model.id)}`)}
          />
        </div>
      )}
      {model.is_verified ? (
        <div className={styles.verified}>
          <Verifyed />
        </div>
      ) : null}
      <div className={styles.info}>
        <div className={styles.main}>
          <Link
            className={styles.name}
            // href={`${locale}/model/${String(model.id).padStart(8, "0")}`}
            href={(forModerator ? `${locale}/admin-moderator` : `${locale}`) + `/model/${String(model.id)}`}
          // href={(forModerator ? `${locale}/admin-moderator` : '') + `${locale}/model/${String(model.id).padStart(8, "0")}`}
          >{model.name}</Link>
          <div className={styles.statuses}>
            {model.is_vip ? <div className={styles.vip}>VIP</div> : null}
            <div
              className={`${isOnline ? styles.online : styles.offline}`}
              title={isOnline ? t("model.online") : t("model.offline")}
            />
          </div>
        </div>
        {viewType === ViewType.ListView && (
          <div className={styles.contacts}>
            {!isPhoneShowed ? (
              <div className={`${styles.phone}`}>
                <Phone />
                {makeHiddenPhoneNumber(model.contacts[0].phone_number)}
                <div
                  className={styles.phone_show}
                  onClick={() => {
                    // event.stopPropagation();
                    setIsPhoneShowed(true);
                  }}
                  title={t("model.show_the_number")}
                >
                  <Eye />
                </div>
              </div>
            ) : (
              <a
                className={`${styles.phone}`}
                href={`tel:+${changePhoneNumber(model.contacts[0].phone_number)}`}
                onClick={(event) => event?.stopPropagation()}
              >
                <Phone />
                {model.contacts[0].phone_number}
              </a>
            )}

            <div className={styles.messengers}>
              {model.contacts[0].is_telegram_enable ? (
                <div title={t("model.has_a_telegram")}>
                  <Telegram isGray={false} />
                </div>
              ) : null}
              {model.contacts[0].is_whatsapp_enable ? (
                <div title={t("model.has_a_whatsapp")}>
                  <Whatsapp isGray={false} />
                </div>
              ) : null}
              {model.contacts[0].is_wechat_enable ? (
                <div title={t("model.has_a_wechat")}>
                  <Wechat isGray={false} />
                </div>
              ) : null}
              {model.contacts[0].is_botim_enable ? (
                <div title={t("model.has_a_botim")}>
                  <Botim isGray={false} />
                </div>
              ) : null}
            </div>
          </div>
        )}
        {
          <div className={styles.location}>
            <Location fill="#98042D" />
            {model.district_id === -1
              ? t("global.not_specified_m")
              : locale === "ru"
                ? filterList.districts && filterList.districts.find((district: IDistrict) => district.id === model.district_id)?.district
                : filterList.districts && filterList.districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
          </div>
        }
        {viewType === ViewType.ListView && (
          <div className={styles.parameters}>
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
              {t("model.breast")}:
              <div className={styles.value}>
                {filterList.breast_sizes && filterList.breast_sizes.find((breastSize: IBreastSize) => breastSize.id === model.breast_size_id)?.breast_size}
              </div>
            </div>
          </div>
        )}
        <div className={`${styles.bottom_info} ${viewType === ViewType.GridView ? styles.grid : ""}`}>
          <div className={styles.photos_videos}>
            <div className={styles.parameter}>
              {model.photos.filter(
                (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed
              ).length > 0 ? (
                <>
                  <PhotoCamera />
                  {
                    model.photos.filter(
                      (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed
                    ).length
                  }
                </>
              ) : null}
            </div>
            <div className={styles.parameter}>
              {model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length > 0 ? (
                <>
                  <VideoCamera />
                  {model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length}
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.services}>
            {filterList.meeting_places && filterList.meeting_places
              .find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
              ?.meeting_place.includes("Аппартаменты") && (
                <div title={t("model.incall")}>
                  <Home />
                </div>
              )}
            {filterList.meeting_places && filterList.meeting_places
              .find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
              ?.meeting_place.includes("Выезд") && (
                <div title={t("model.outcall")}>
                  <Car />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModel;
