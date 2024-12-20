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
exports.uploadTmpPublicPhoto = exports.uploadPublicVideo = exports.uploadPublicPhoto = exports.uploadCheckPhoto = void 0;
var fs_1 = require("fs");
var connectionPool_1 = require("../../../connectionPool");
var serverConfig_1 = require("../../../../serverConfig");
var fs = require("fs");
var path = require("path");
var mysql = require("mysql");
var uploadCheckPhoto = function (request, response) {
    try {
        var modelId = request.body.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        if (request.files) {
            var file = request.files.checkPhoto;
            var directory = path.join(serverConfig_1.default.directory, "uploads", "media", "check_photos");
            var fileNameArr = file.name.split(".");
            var fileName_1 = request.body.model_id + "mck" + String(Date.now()) + "." + fileNameArr[fileNameArr.length - 1];
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(path.join(directory), { recursive: true });
            }
            file.mv(path.join(directory, fileName_1), function (error) {
                if (error) {
                    return response.status(404).json({
                        success: false,
                        message: "server.mistake_try_again",
                        error: error,
                    });
                }
                else {
                    var sql = "INSERT INTO photos (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
                    var query = mysql.format(sql, [
                        "model_id",
                        "photo_url",
                        "type",
                        "status",
                        "update_date",
                        request.body.model_id,
                        "/media/check_photos/" + fileName_1,
                        0,
                        1,
                        new Date(),
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
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.uploadCheckPhoto = uploadCheckPhoto;
var uploadTmpPublicPhoto = function (request, response) {
    try {
        if (request.files) {
            var file = request.files.publicPhoto;
            var directory = path.join(serverConfig_1.default.directory, "uploads", "media", "photos", "tmp");
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(path.join(directory), { recursive: true });
            }
            file.mv(path.join(directory, request.body.filename), function (error) {
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
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.uploadTmpPublicPhoto = uploadTmpPublicPhoto;
var uploadPublicPhoto = function (request, response) {
    try {
        var modelId = request.body.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        if (request.files) {
            var file = request.files.publicPhoto;
            var directory = path.join(serverConfig_1.default.directory, "uploads", "media", "photos");
            if (!fs.existsSync(path.join(directory))) {
                fs.mkdirSync(path.join(directory), { recursive: true });
            }
            if (fs.existsSync(path.join(directory, "tmp", request.body.filename))) {
                (0, fs_1.unlink)(path.join(directory, "tmp", request.body.filename), function (error) {
                    if (error)
                        console.log(error);
                });
            }
            file.mv(path.join(directory, request.body.filename), function (error) {
                if (error) {
                    return response.status(404).json({
                        success: false,
                        message: "server.mistake_try_again",
                        error: error,
                    });
                }
                else {
                    var fileThumb = request.files.thumbnail;
                    var directoryThumb = path.join(serverConfig_1.default.directory, "uploads", "media", "photos");
                    if (!fs.existsSync(directoryThumb)) {
                        fs.mkdirSync(path.join(directoryThumb), { recursive: true });
                    }
                    if (fs.existsSync(path.join(directoryThumb, request.body.filename))) {
                        (0, fs_1.unlink)(path.join(directoryThumb, request.body.filename), function (error) {
                            if (error)
                                console.log(error);
                        });
                    }
                    fileThumb.mv(path.join(directoryThumb, request.body.filename), function (error) {
                        return __awaiter(this, void 0, void 0, function () {
                            var photos, sql, query;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!error) return [3 /*break*/, 1];
                                        return [2 /*return*/, response.status(404).json({
                                                success: false,
                                                message: "server.mistake_try_again",
                                                error: error,
                                            })];
                                    case 1: return [4 /*yield*/, new Promise(function (resolve) {
                                            var sqlPhotos = "SELECT * FROM photos WHERE model_id = ?;";
                                            var queryPhotos = mysql.format(sqlPhotos, [request.body.model_id]);
                                            connectionPool_1.connectionPool.query(queryPhotos, function (error, data) {
                                                if (error) {
                                                    resolve([]);
                                                }
                                                else {
                                                    var photos_1 = data;
                                                    resolve(photos_1);
                                                }
                                            });
                                        })];
                                    case 2:
                                        photos = _a.sent();
                                        sql = "INSERT INTO photos (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
                                        query = mysql.format(sql, [
                                            "model_id",
                                            "photo_url",
                                            "type",
                                            "update_date",
                                            "is_main",
                                            request.body.model_id,
                                            "/media/photos/" + request.body.filename,
                                            1,
                                            new Date(),
                                            !(photos && photos.length && photos.length > 0),
                                        ]);
                                        return [4 /*yield*/, new Promise(function (resolve) {
                                                var sqlPhotos = "SELECT * FROM photos WHERE model_id = ? AND type = 0;";
                                                var queryPhotos = mysql.format(sqlPhotos, [request.body.model_id]);
                                                connectionPool_1.connectionPool.query(queryPhotos, function (error, data) {
                                                    if (error) {
                                                        resolve(false);
                                                    }
                                                    else {
                                                        var photos_2 = data;
                                                        if (photos_2 && photos_2.length && photos_2.length > 0) {
                                                            var sql_1 = "UPDATE photos SET status = 1 WHERE id = ?;";
                                                            var query_1 = mysql.format(sql_1, [photos_2[photos_2.length - 1].id]);
                                                            connectionPool_1.connectionPool.query(query_1, function (error) {
                                                                if (error) {
                                                                    resolve(false);
                                                                }
                                                                else {
                                                                    resolve(true);
                                                                }
                                                            });
                                                        }
                                                        resolve(true);
                                                    }
                                                });
                                            })];
                                    case 3:
                                        _a.sent();
                                        connectionPool_1.connectionPool.query(query, function (error) {
                                            if (error) {
                                                return response.status(404).json({
                                                    success: false,
                                                    message: "server.mistake_try_again",
                                                    error: error,
                                                });
                                            }
                                            else {
                                                var sqlModel = "UPDATE models SET is_verified = 0 WHERE id = ?;";
                                                var queryModel = mysql.format(sqlModel, [request.body.model_id]);
                                                connectionPool_1.connectionPool.query(queryModel, function (error) {
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
                                        });
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.uploadPublicPhoto = uploadPublicPhoto;
var uploadPublicVideo = function (request, response) {
    try {
        var modelId = request.body.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        if (request.files) {
            var file = request.files.publicVideo;
            var directory = path.join(serverConfig_1.default.directory, "uploads", "media", "videos");
            console.log(directory);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(path.join(directory), { recursive: true });
            }
            file.mv(path.join(directory, request.body.filename), function (error) {
                if (error) {
                    return response.status(404).json({
                        success: false,
                        message: "server.mistake_try_again",
                        error: error,
                    });
                }
                else {
                    var sql = "INSERT INTO videos (??, ??) VALUES (?, ?);";
                    var query = mysql.format(sql, [
                        "model_id",
                        "video_url",
                        request.body.model_id,
                        "/media/videos/" + request.body.filename,
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
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.uploadPublicVideo = uploadPublicVideo;
