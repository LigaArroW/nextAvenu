import { INavigationLink } from "@/types/main/navigationLink";


type LinkList = Record<string, INavigationLink[]>


export const LinksList: LinkList = {
    0: [
        {
            id: 0,
            link: "Верификация",
            is_for_modal: false,
            link_url: "/admin-moderator",
        } as INavigationLink,
        {
            id: 1,
            link: "Проверка отзывов",
            is_for_modal: false,
            link_url: "/admin-moderator/checking_reviews",
        } as INavigationLink,
        {
            id: 2,
            link: "Все анкеты",
            is_for_modal: false,
            link_url: "/admin-moderator/all_proposals",
        } as INavigationLink,
        {
            id: 3,
            link: "Редактирование конфигурации",
            is_for_modal: false,
            link_url: "/admin-moderator/editing_configuration",
        } as INavigationLink,
        {
            id: 4,
            link: "Аккаунты",
            is_for_modal: false,
            link_url: "/admin-moderator/accounts",
        } as INavigationLink,
    ] as INavigationLink[],
    1: [
        {
            id: 0,
            link: "FAQ",
            is_for_modal: false,
            link_url: "/admin-moderator/faq",
        },
        {
            id: 1,
            link: "Страницы",
            is_for_modal: false,
            link_url: "/admin-moderator/pages",
        }
    ] as INavigationLink[],
    2: [] as INavigationLink[],

}