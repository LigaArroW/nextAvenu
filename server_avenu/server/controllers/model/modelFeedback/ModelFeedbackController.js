"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModelFeedback = exports.updateModelFeedbacksView = exports.getModelFeedbacks = exports.updateModelFeedbackStatus = exports.addModelFeedback = void 0;
var connectionPool_1 = require("../../../connectionPool");
var mysql = require("mysql");
var addModelFeedback = function (request, response) {
    try {
        var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
        var secChUa = request.headers['sec-ch-ua'];
        var platform = request.headers['sec-ch-ua-platform'];
        var mobile = request.headers['sec-ch-ua-mobile'];
        var acceptLanguage = request.headers['accept-language'];
        var userData = { ip: ip, secChUa: secChUa, platform: platform, mobile: mobile, acceptLanguage: acceptLanguage };
        var sql = "INSERT INTO model_feedbacks (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        var query = mysql.format(sql, [
            "model_id",
            "name",
            "is_from_model",
            "is_photo_real",
            "is_only_one",
            "text",
            "rate",
            "create_date",
            "status",
            "parent_id",
            "user_data",
            request.body.params.model_feedback.model_id,
            request.body.params.model_feedback.name,
            request.body.params.model_feedback.is_from_model,
            request.body.params.model_feedback.is_photo_real,
            request.body.params.model_feedback.is_only_one,
            request.body.params.model_feedback.text,
            request.body.params.model_feedback.rate,
            new Date(),
            "1",
            request.body.params.model_feedback.parent_id,
            JSON.stringify(userData),
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
        console.log(error);
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.addModelFeedback = addModelFeedback;
var getModelFeedbacks = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM model_feedbacks", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var modelFeedbacks = data;
                return response.json(modelFeedbacks);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.getModelFeedbacks = getModelFeedbacks;
var updateModelFeedbackStatus = function (request, response) {
    try {
        var sql = "UPDATE model_feedbacks SET status = ? WHERE id = ?;";
        var query = mysql.format(sql, [request.body.params.status, request.body.params.model_feedback.id]);
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
        console.log(error);
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.updateModelFeedbackStatus = updateModelFeedbackStatus;
var updateModelFeedbacksView = function (request, response) {
    try {
        var sql = "UPDATE model_feedbacks SET is_viewed = 1 WHERE model_id = ?;";
        var query = mysql.format(sql, [request.body.params.model_id]);
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
        console.log(error);
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.updateModelFeedbacksView = updateModelFeedbacksView;
var deleteModelFeedback = function (request, response) {
    try {
        var sql = "DELETE FROM model_feedbacks WHERE id = ?;";
        var query = mysql.format(sql, [request.body.params.feedback.id]);
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
        console.log(error);
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.deleteModelFeedback = deleteModelFeedback;
