"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.updateVideoStatus = exports.getVideos = void 0;
var fs_1 = require("fs");
var connectionPool_1 = require("../../../connectionPool");
var serverConfig_1 = require("../../../../serverConfig");
var mysql = require("mysql");
var fs = require("fs");
var path = require("path");
var deleteVideo = function (request, response) {
    try {
        var modelId = request.body.params.video.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        var sql = "DELETE FROM videos WHERE id = ?;";
        var query = mysql.format(sql, [request.body.params.video.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var directory = path.join(serverConfig_1.default.directory, "uploads");
                if (fs.existsSync(path.join(directory, request.body.params.video.video_url))) {
                    (0, fs_1.unlink)(path.join(directory, request.body.params.video.video_url), function (error) {
                        if (error)
                            console.log(error);
                    });
                }
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
exports.deleteVideo = deleteVideo;
var getVideos = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM videos", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var videos = data;
                return response.json(videos);
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
exports.getVideos = getVideos;
var updateVideoStatus = function (request, response) {
    try {
        var modelId = request.body.params.video.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        var sql = "UPDATE videos SET status = ? WHERE id = ?;";
        var query = mysql.format(sql, [request.body.params.status, request.body.params.video.id]);
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
exports.updateVideoStatus = updateVideoStatus;
