import 'dotenv/config'
import { connectionPool } from "../../../connectionPool";
import { IUser } from '../../../../types/user/user';


const mysql = require("mysql");

const updatePassword = (request, response) => {
    if (!request.isSuper) {
        return response.status(404).json({
            success: false,
            message: "global.not_enough_permissions",
        });
    }
    try {
        const sql = 'SELECT * FROM users WHERE login = ?';
        const query = mysql.format(sql, [request.body.params.login]);
        connectionPool.query(query, (error) => {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                })
            } else {

                const sql = "UPDATE users SET password = ? WHERE login = ?;";

                const query = mysql.format(sql, [request.body.params.password, request.body.params.login]);
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

const getProfilesAdmins = (request, response) => {
    try {

        if (!request.isSuper) {
            return response.status(404).json({
                success: false,
                message: "global.not_enough_permissions",
            });
        }

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


export { updatePassword, getProfilesAdmins };