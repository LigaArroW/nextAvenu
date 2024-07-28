"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModelServices = void 0;
var connectionPool_1 = require("../../../connectionPool");
var mysql = require("mysql");
var addModelServices = function (request, response) {
    try {
        var modelId = request.body.params.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        var sql_1 = "DELETE FROM model_services WHERE ?? = ?; ";
        var values_1 = ["model_id", request.body.params.model_id];
        request.body.params.model_services.forEach(function (modelService) {
            sql_1 += "INSERT INTO model_services (??, ??, ??) VALUES (?, ?, ?); ";
            values_1.push("model_id", "service_id", "price", request.body.params.model_id, modelService.service_id, modelService.price);
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
exports.addModelServices = addModelServices;
