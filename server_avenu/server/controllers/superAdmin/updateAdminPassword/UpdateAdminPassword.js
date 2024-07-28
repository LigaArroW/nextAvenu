"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilesAdmins = exports.updatePassword = void 0;
require("dotenv/config");
var connectionPool_1 = require("../../../connectionPool");
var mysql = require("mysql");
var updatePassword = function (request, response) {
    if (!request.isSuper) {
        return response.status(404).json({
            success: false,
            message: "global.not_enough_permissions",
        });
    }
    try {
        var sql = 'SELECT * FROM users WHERE login = ?';
        var query = mysql.format(sql, [request.body.params.login]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var sql_1 = "UPDATE users SET password = ? WHERE login = ?;";
                var query_1 = mysql.format(sql_1, [request.body.params.password, request.body.params.login]);
                connectionPool_1.connectionPool.query(query_1, function (error) {
                    if (error) {
                        console.log('Error: ошибка внутри ', error);
                        return response.status(404).json({
                            success: false,
                            message: "server.mistake_try_again",
                            error: error,
                        });
                    }
                    else {
                        return response.status(200).json({ success: true });
                    }
                });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.updatePassword = updatePassword;
var getProfilesAdmins = function (request, response) {
    try {
        if (!request.isSuper) {
            return response.status(404).json({
                success: false,
                message: "global.not_enough_permissions",
            });
        }
        var query = 'SELECT * FROM users WHERE type IN (0, 1)';
        connectionPool_1.connectionPool.query(query, function (error, results) {
            if (error) {
                return response.status(200).json({
                    success: false,
                    message: "global.invalid_username",
                    error: error,
                });
            }
            else {
                var users = results;
                return response.status(200).json({
                    success: true,
                    users: users
                });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.getProfilesAdmins = getProfilesAdmins;
