import 'dotenv/config'
import * as bcrypt from "bcryptjs"
import { connectionPool } from "../../../connectionPool";
import { IUser } from '../../../../types/user/user';

const saltRounds = 5;

const mysql = require("mysql");

const updatePasswordUsers = (request, response) => {
    if (!request.isAdmin) {
        return response.status(404).json({
            success: false,
            message: "global.not_enough_permissions",
        });
    }
    try {
        const sql = 'SELECT * FROM profiles WHERE login = ?';
        const query = mysql.format(sql, [request.body.params.login]);
        connectionPool.query(query, async (error) => {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                })
            } else {

                const sql = "UPDATE profiles SET password = ? WHERE login = ?;";
                const hash = await bcrypt.hash(request.body.params.password, saltRounds);
                const query = mysql.format(sql, [hash, request.body.params.login]);
                connectionPool.query(query, (error) => {
                    if (error) {
                        console.log('Error: ошибка внутри ', error);

                        return response.status(404).json({
                            success: false,
                            message: "server.mistake_try_again",
                            error: error,
                        });
                    } else {
                        return response.status(200).json({ success: true });
                    }
                })

            }
        })

    } catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });

    }
}

const getProfilesUsers = (request, response) => {
    
    try {

        if (!request.isAdmin) {
            return response.status(404).json({
                success: false,
                message: "global.not_enough_permissions",
            });
        }

        const query = 'SELECT * FROM profiles WHERE is_confirmed = 1';
        
        connectionPool.query(query, (error, results) => {
            if (error) {
                return response.status(200).json({
                    success: false,
                    message: "global.invalid_username",
                    error: error,
                });
            } else {
                const users = results as IUser[];
                return response.status(200).json({
                    success: true,
                    users
                });
            }
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
}


export { updatePasswordUsers, getProfilesUsers };