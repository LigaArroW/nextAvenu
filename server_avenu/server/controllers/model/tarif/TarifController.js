"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTarifs = void 0;
var connectionPool_1 = require("../../../connectionPool");
var mysql = require("mysql");
var addTarifs = function (request, response) {
    try {
        // const modelId = request.body.params.model_id
        // if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
        //   return response.status(500).json({
        //     success: false,
        //     message: "server.mistake_try_again",
        //   });
        // }
        var sql_1 = "DELETE FROM tarifs WHERE ?? = ?; ";
        var values_1 = ["model_id", request.body.params.model_id];
        request.body.params.tarifs.forEach(function (tarif) {
            sql_1 += "INSERT INTO tarifs (??, ??, ??, ??) VALUES (?, ?, ?, ?); ";
            values_1.push("model_id", "work_duration_id", "meeting_place_id", "price", request.body.params.model_id, tarif.work_duration_id, tarif.meeting_place_id, tarif.price);
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
exports.addTarifs = addTarifs;
