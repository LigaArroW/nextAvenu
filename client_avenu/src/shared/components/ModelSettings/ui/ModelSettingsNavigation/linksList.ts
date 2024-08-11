import { IModelSettingsLink } from "@/types/main/modelSettingsLink";


const LinksList = [
  { id: 0, link: "model.parameters", link_url: "/profile/model_settings/parameters" },
  { id: 1, link: "model.photos_sub", link_url: "/profile/model_settings/photos" },
  { id: 2, link: "model.videos", link_url: "/profile/model_settings/videos" },
  { id: 3, link: "model.tariffs", link_url: "/profile/model_settings/tariffs" },
  { id: 4, link: "model.services", link_url: "/profile/model_settings/services" },
  { id: 5, link: "model.statistics", link_url: "/profile/model_settings/statistics" },
  { id: 6, link: "model.feedbacks", link_url: "/profile/model_settings/feedbacks" },
  { id: 7, link: "model.orders", link_url: "/profile/model_settings/orders" },
] as IModelSettingsLink[];

export default LinksList;
