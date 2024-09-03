"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlacklistAccess = exports.getBlacklist = exports.deleteBlacklistAccess = exports.deleteBlacklist = exports.addBlacklistAccess = exports.addBlacklist = void 0;
var connectionPool_1 = require("../../../connectionPool");
var mysql = require("mysql");
var getBlacklist = function (_request, response) {
    try {
        var sql = "SELECT * FROM blacklist WHERE agency_id = ?";
        var query = mysql.format(sql, [_request.query.agency_id]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Ошибка при получении черного списка",
                    error: error,
                });
            }
            else {
                var blacklist = data;
                return response.json(blacklist);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить черный список",
            error: error,
        });
    }
};
exports.getBlacklist = getBlacklist;
var addBlacklist = function (request, response) {
    try {
        var sql = "INSERT INTO blacklist (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
        // const sql = "INSERT INTO blacklist (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) WHERE agency_id = ?;";
        var query = mysql.format(sql, [
            "agency_id",
            "country_id",
            "city_id",
            "phone_number",
            "description",
            request.body.params.agency_id,
            request.body.params.country_id,
            request.body.params.city_id,
            request.body.params.phone_number,
            request.body.params.description,
            // request.body.params.agency_id
        ]);
        console.log(query);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                console.log("🚀 ~ connectionPool.query ~ error:", error);
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
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.addBlacklist = addBlacklist;
var deleteBlacklist = function (request, response) {
    try {
        var sql = "DELETE FROM blacklist WHERE ?? = ? AND agency_id = ?;";
        var query = mysql.format(sql, ["id", request.body.params.id, request.body.params.agency_id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
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
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.deleteBlacklist = deleteBlacklist;
var getBlacklistAccess = function (request, response) {
    try {
        var sql = "SELECT * FROM blacklist_access WHERE agency_id = ? OR access_to = ?";
        var query = mysql.format(sql, [request.query.agency_id, request.query.agency_id]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Ошибка при получении доступа к черному списку",
                    error: error,
                });
            }
            else {
                var blacklistAccess = data;
                return response.json(blacklistAccess);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить доступ к черному списку",
            error: error,
        });
    }
};
exports.getBlacklistAccess = getBlacklistAccess;
var addBlacklistAccess = function (request, response) {
    try {
        var sql = "INSERT INTO blacklist_access (??, ??) VALUES (?, ?);";
        var query = mysql.format(sql, [
            "agency_id",
            "access_to",
            request.body.params.agency_id,
            request.body.params.access_to,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
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
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.addBlacklistAccess = addBlacklistAccess;
var deleteBlacklistAccess = function (request, response) {
    try {
        var sql = "DELETE FROM blacklist_access WHERE ?? = ? AND agency_id = ?;";
        var query = mysql.format(sql, ["id", request.body.params.id, request.body.params.agency_id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
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
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.deleteBlacklistAccess = deleteBlacklistAccess;
