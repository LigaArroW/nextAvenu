"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotos = exports.deletePhoto = exports.updatePhotoStatus = exports.updateMainPhoto = void 0;
var fs_1 = require("fs");
var connectionPool_1 = require("../../../connectionPool");
var serverConfig_1 = require("../../../../serverConfig");
var mysql = require("mysql");
var fs = require("fs");
var path = require("path");
var updateMainPhoto = function (request, response) {
    try {
        // const modelId = request.body.params.model_id
        // if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
        //   return response.status(500).json({
        //     success: false,
        //     message: "server.mistake_try_again",
        //   });
        // }
        var sql = "UPDATE photos SET is_main = 0 WHERE model_id = ?; UPDATE photos SET is_main = 1 WHERE id = ?;";
        var query = mysql.format(sql, [request.body.params.model_id, request.body.params.photo_id]);
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
exports.updateMainPhoto = updateMainPhoto;
var deletePhoto = function (request, response) {
    try {
        // const modelId = request.body.params.photo.model_id
        // if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
        //   return response.status(500).json({
        //     success: false,
        //     message: "server.mistake_try_again",
        //   });
        // }
        var sql = "DELETE FROM photos WHERE id = ?;";
        var query = mysql.format(sql, [request.body.params.photo.id]);
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
                if (fs.existsSync(path.join(directory, request.body.params.photo.photo_url))) {
                    (0, fs_1.unlink)(path.join(directory, request.body.params.photo.photo_url), function (error) {
                        if (error)
                            console.log(error);
                    });
                }
                // if (
                //   fs.existsSync(
                //     path.join(
                //       directory,
                //       (request.body.params.photo.photo_url as String).replace("/media/photos/", "/media/photos/thumbs/")
                //     )
                //   )
                // ) {
                //   unlink(
                //     path.join(
                //       directory,
                //       (request.body.params.photo.photo_url as String).replace("/media/photos/", "/media/photos/thumbs/")
                //     ),
                //     (error) => {
                //       if (error) console.log(error);
                //     }
                //   );
                // }
                var sqlPhotos = "SELECT * FROM photos WHERE model_id = ?;";
                var queryPhotos = mysql.format(sqlPhotos, [request.body.params.photo.model_id]);
                connectionPool_1.connectionPool.query(queryPhotos, function (error, data) {
                    if (error) {
                        return response.status(404).json({
                            message: "server.mistake_try_again",
                            error: error,
                        });
                    }
                    else {
                        var photos = data;
                        if (photos.length && ((photos.length === 2 && !photos[0].is_main) || request.body.params.photo.is_main)) {
                            var sqlUpdate = "UPDATE photos SET is_main = 1 WHERE id = ?;";
                            var queryUpdate = mysql.format(sqlUpdate, [photos[0].id]);
                            connectionPool_1.connectionPool.query(queryUpdate, function (error) {
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
                        else {
                            return response.status(200).json({ success: true });
                        }
                    }
                });
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
exports.deletePhoto = deletePhoto;
var getPhotos = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM photos", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var photos = data;
                return response.json(photos);
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
exports.getPhotos = getPhotos;
var updatePhotoStatus = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, query;
    return __generator(this, function (_a) {
        try {
            sql = "UPDATE photos SET status = ?, update_date = ? WHERE id = ?;";
            query = mysql.format(sql, [request.body.params.status, new Date(), request.body.params.photo.id]);
            connectionPool_1.connectionPool.query(query, function (error) {
                if (error) {
                    return response.status(404).json({
                        success: false,
                        message: "server.mistake_try_again",
                        error: error,
                    });
                }
                else {
                    if (request.body.params.photo.type === 0 && request.body.params.status === 2) {
                        var sqlVerification = "UPDATE models SET is_verified = 1 WHERE id = ?";
                        var queryVerification = mysql.format(sqlVerification, [request.body.params.photo.model_id]);
                        connectionPool_1.connectionPool.query(queryVerification, function (error) {
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
                    else {
                        return response.status(200).json({ success: true });
                    }
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
        return [2 /*return*/];
    });
}); };
exports.updatePhotoStatus = updatePhotoStatus;
