"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWorkTimes = void 0;
var connectionPool_1 = require("../../../connectionPool");
var mysql = require("mysql");
var addWorkTimes = function (request, response) {
    try {
        var modelId = request.body.params.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        var sql_1 = "DELETE FROM work_times WHERE ?? = ?; ";
        var values_1 = ["model_id", request.body.params.model_id];
        request.body.params.work_times.forEach(function (workTime) {
            sql_1 += "INSERT INTO work_times (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?); ";
            values_1.push("model_id", "time_start", "time_end", "is_all_day", "day_of_week_id", request.body.params.model_id, workTime.time_start, workTime.time_end, workTime.is_all_day, workTime.day_of_week_id);
        });
        var query = mysql.format(sql_1, values_1);
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
exports.addWorkTimes = addWorkTimes;
