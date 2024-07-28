import { IUser } from "../user/user";

export interface ISuperAdmin {
    id: number;
    login: string;
    password: string;
    collectionUsers: IUser[];
}