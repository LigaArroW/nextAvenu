import 'dotenv/config'
import { Roles } from "../../auth/rbac";
import { connectionPool } from "../../connectionPool";
import { IUser } from "../../../types/user/user";
import { ISuperAdmin } from "../../../types/superAdmin/superAdmin";
import * as crypto from "crypto";

const jwt = require("jsonwebtoken");

const loginSuperAdmin = async (request, response) => {

    try {

        if (request.body.params.login === process.env.SUPER_ADMIN_LOGIN && request.body.params.password === process.env.SUPER_ADMIN_PASSWORD) {

            const query = 'SELECT * FROM users WHERE type IN (0, 1)';

            connectionPool.query(query, (error, results) => {
                if (error) {
                    return response.status(200).json({
                        success: false,
                        message: "global.invalid_username",
                        error: error,
                    });
                } else {
                    const users = results as IUser[];
                    const superAd = {
                        id: Math.floor(Math.random() * 100000),
                        roles: Roles.SuperAdmin,
                        password: crypto.createHash('sha256').update(request.body.params.password).digest('hex'),
                        login: process.env.SUPER_ADMIN_LOGIN,
                        collectionUsers: users
                    } as ISuperAdmin;
                    const now = Math.floor(Date.now() / 1000);
                    const token = jwt.sign(
                        {
                            _id: superAd.id,
                            roles: Roles.SuperAdmin,
                            // collectionUsers: users,
                            iat: now
                        },
                        process.env.JWT_TOKEN_SECRET,
                        {
                            expiresIn: "3d",
                        }
                    );
                    return response.json({
                        ...superAd,
                        token,
                        success: true,
                    });
                }
            });
        } else {
            response.status(200).json({
                success: false,
                message: "global.invalid_username",
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }



}


const authmeSuperAdmin = (request, response) => {
    try {

        const user = request.user as ISuperAdmin;
        if (user.password === crypto.createHash('sha256').update(process.env.SUPER_ADMIN_PASSWORD!).digest('hex') || request.isSuper) {
            return response.status(200).json({
                success: true,
                user,
                date: new Date()

            })
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Не удалось проверить пользователя",
            error: error,
        });
    }

}



export { loginSuperAdmin, authmeSuperAdmin };