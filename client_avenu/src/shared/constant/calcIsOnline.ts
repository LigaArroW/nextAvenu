import { IModel } from "@/types/model/model/model";

export const calcIsOnline = (model: IModel) => {
    const now = new Date();
    const lastOnline = new Date(model.last_online);
    const difference = Math.abs(now.getTime() - lastOnline.getTime()) / (1000 * 60);
    const check = difference < 3
    return check;
};