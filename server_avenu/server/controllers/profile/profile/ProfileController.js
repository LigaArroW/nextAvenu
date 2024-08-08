"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.changePassword = exports.generateToken = exports.getAgencies = exports.deleteProfile = exports.updateProfile = exports.confirmProfile = exports.loginEmail = exports.generateLoginMailToken = exports.restorePassword = exports.authme = exports.register = exports.login = void 0;
var nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");
require("dotenv/config");
var connectionPool_1 = require("../../../connectionPool");
var rbac_1 = require("../../../auth/rbac");
var saltRounds = 5;
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var login = function (request, response) {
    try {
        var sql = "SELECT * FROM profiles WHERE is_confirmed = 1 AND login = ?";
        var query = mysql.format(sql, [request.body.params.login]);
        connectionPool_1.connectionPool.query(query, function (error, data) { return __awaiter(void 0, void 0, void 0, function () {
            var auth_1, match, decode, _a, error_1, sqlCheck, queryCheck;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!error) return [3 /*break*/, 1];
                        return [2 /*return*/, response.status(200).json({
                                success: false,
                                message: "global.invalid_username",
                                error: error,
                            })];
                    case 1:
                        auth_1 = data;
                        if (!(auth_1.length === 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, response.status(200).json({
                                success: false,
                                message: "global.invalid_username",
                            })];
                    case 2: return [4 /*yield*/, bcrypt.compare(request.body.params.password, auth_1[0].password)];
                    case 3:
                        match = _b.sent();
                        decode = void 0;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 8, , 9]);
                        if (!(request.body.params.email === true && match === false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, jwt.verify(request.body.params.password, process.env.JWT_TOKEN_SECRET)];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _a = false;
                        _b.label = 7;
                    case 7:
                        decode = _a;
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        return [2 /*return*/, response.status(200).json({
                                success: false,
                                message: "global.invalid_username",
                                error: error_1
                            })];
                    case 9:
                        if (match || decode) {
                            sqlCheck = "SELECT * FROM deleted_profiles WHERE agency_id = ?";
                            queryCheck = mysql.format(sqlCheck, auth_1[0].id);
                            connectionPool_1.connectionPool.query(queryCheck, function (error, checkData) { return __awaiter(void 0, void 0, void 0, function () {
                                var deleterProfiles, models, now, token;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!error) return [3 /*break*/, 1];
                                            return [2 /*return*/, response.status(200).json({
                                                    success: false,
                                                    message: "server.mistake_try_again",
                                                    error: error,
                                                })];
                                        case 1:
                                            deleterProfiles = checkData;
                                            if (!(Array.isArray(deleterProfiles) && deleterProfiles.length > 0)) return [3 /*break*/, 2];
                                            return [2 /*return*/, response.status(200).json({
                                                    success: false,
                                                    message: "global.user_has_been_deleted",
                                                    error: error,
                                                })];
                                        case 2: return [4 /*yield*/, new Promise(function (resolve) {
                                                var sqlModels = "SELECT id FROM models WHERE agency_id = ?";
                                                var queryModels = mysql.format(sqlModels, auth_1[0].id);
                                                connectionPool_1.connectionPool.query(queryModels, function (error, data) {
                                                    if (error) {
                                                        resolve([]);
                                                    }
                                                    else {
                                                        var photos = data;
                                                        resolve(photos);
                                                    }
                                                });
                                            })];
                                        case 3:
                                            models = _a.sent();
                                            now = Math.floor(Date.now() / 1000);
                                            token = jwt.sign({
                                                balance: auth_1[0].balance,
                                                is_confirmed: auth_1[0].is_confirmed,
                                                _id: auth_1[0].id,
                                                login: auth_1[0].login,
                                                models: models.map(function (m) { return m.id; }),
                                                roles: auth_1[0].type === 0 ? rbac_1.Roles.Agency : rbac_1.Roles.Customer,
                                                iat: now
                                            }, process.env.JWT_TOKEN_SECRET, {
                                                expiresIn: "3d",
                                            });
                                            response.json(__assign(__assign({}, auth_1[0]), { token: token, success: true }));
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            return [2 /*return*/, response.status(200).json({
                                    success: false,
                                    message: "global.invalid_username",
                                })];
                        }
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        }); });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.login = login;
var register = function (request, response) {
    try {
        var sqlCheck = "SELECT * FROM profiles WHERE login = ?;";
        var queryCheck = mysql.format(sqlCheck, [request.body.params.login]);
        connectionPool_1.connectionPool.query(queryCheck, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var profiles_1 = data;
                if (Array.isArray(profiles_1) && profiles_1.length > 0) {
                    var sqlDeleteCheck = "SELECT * FROM deleted_profiles WHERE agency_id = ?";
                    var queryDeleteCheck = mysql.format(sqlDeleteCheck, [profiles_1[0].id]);
                    connectionPool_1.connectionPool.query(queryDeleteCheck, function (error, data) {
                        if (error) {
                            return response.status(404).json({
                                success: false,
                                message: "server.mistake_try_again",
                                error: error,
                            });
                        }
                        else {
                            var deletedProfiles_1 = data;
                            if (!Array.isArray(deletedProfiles_1) || deletedProfiles_1.length === 0) {
                                return response.status(200).json({
                                    success: false,
                                    message: "global.user_already_registered",
                                    error: "global.user_already_registered",
                                });
                            }
                            else {
                                var mailOptions = {
                                    from: "sexavenuex@gmail.com",
                                    to: request.body.params.login,
                                    subject: request.body.params.emailSubject,
                                    html: request.body.params.html,
                                };
                                var transporter = nodemailer.createTransport({
                                    host: "smtp.gmail.ru",
                                    port: 587,
                                    secure: false,
                                    service: "gmail",
                                    auth: {
                                        user: "sexavenuex@gmail.com",
                                        pass: "hfqarnmrocxwvxpp",
                                    },
                                });
                                transporter.sendMail(mailOptions, function (error, _info) {
                                    if (error) {
                                        return response.status(500).json({
                                            success: false,
                                            message: "server.mistake_try_again",
                                            error: error,
                                        });
                                    }
                                    else {
                                        var sql = "UPDATE profiles SET ?? = ?, is_confirmed = 0 WHERE id = ?; DELETE FROM deleted_profiles WHERE id = ?";
                                        var query = mysql.format(sql, [
                                            "password",
                                            request.body.params.password,
                                            profiles_1[0].id,
                                            deletedProfiles_1[0].id,
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
                    });
                }
                else {
                    var mailOptions = {
                        from: "sexavenuex@gmail.com",
                        to: request.body.params.login,
                        subject: request.body.params.emailSubject,
                        html: request.body.params.html,
                    };
                    var transporter = nodemailer.createTransport({
                        host: "smtp.gmail.ru",
                        port: 587,
                        secure: false,
                        service: "gmail",
                        auth: {
                            user: "sexavenuex@gmail.com",
                            pass: "hfqarnmrocxwvxpp",
                        },
                    });
                    transporter.sendMail(mailOptions, function (error, _info) { return __awaiter(void 0, void 0, void 0, function () {
                        var sql, hash, query;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!error) return [3 /*break*/, 1];
                                    console.log(error);
                                    return [2 /*return*/, response.status(500).json({
                                            success: false,
                                            message: "server.mistake_try_again",
                                            error: error,
                                        })];
                                case 1:
                                    sql = "INSERT INTO profiles (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
                                    return [4 /*yield*/, bcrypt.hash(request.body.params.password, saltRounds)];
                                case 2:
                                    hash = _a.sent();
                                    query = mysql.format(sql, [
                                        "login",
                                        "password",
                                        "balance",
                                        "type",
                                        request.body.params.login,
                                        hash,
                                        0,
                                        request.body.params.type,
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
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                }
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
exports.register = register;
var generateToken = function (request, response) {
    try {
        var token = jwt.sign({
            _id: request.body.params.login,
        }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: "1d",
        });
        if (token) {
            response.status(200).json({ success: true, token: token });
        }
        else {
            response.status(404).json({
                success: false,
                message: "Ошибка при генерации токена",
            });
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: "Не удалось сгенерировать токен",
            error: error,
        });
    }
};
exports.generateToken = generateToken;
var generateLoginMailToken = function (request, response) {
    try {
        var token = jwt.sign({
            _id: request.body.params.login,
        }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: "5m",
        });
        if (token) {
            response.status(200).json({ success: true, token: token });
        }
        else {
            response.status(404).json({
                success: false,
                message: "Ошибка при генерации токена",
            });
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: "Не удалось сгенерировать токен",
            error: error,
        });
    }
};
exports.generateLoginMailToken = generateLoginMailToken;
var confirmProfile = function (request, response) {
    try {
        var decoded = jwt.verify(request.body.params.token, process.env.JWT_TOKEN_SECRET);
        request.id = decoded._id;
        if (decoded._id === request.body.params.login) {
            var sql = "UPDATE profiles SET is_confirmed = 1 WHERE login = ?;";
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
                    return response.status(200).json({ success: true });
                }
            });
        }
        else {
            return response.status(404).json({
                success: false,
                message: "server.mistake_try_again",
                error: "",
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
exports.confirmProfile = confirmProfile;
var authme = function (request, response) {
    try {
        connectionPool_1.connectionPool.query('SELECT * FROM profiles WHERE id="' + request.id + '"', function (error, data) { return __awaiter(void 0, void 0, void 0, function () {
            var models, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!error) return [3 /*break*/, 1];
                        return [2 /*return*/, response.status(404).json({
                                success: false,
                                message: "Пользователь не найден",
                                error: error,
                            })];
                    case 1:
                        if (!(data.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var sqlModels = "SELECT id FROM models WHERE agency_id = ?";
                                var queryModels = mysql.format(sqlModels, data[0].id);
                                connectionPool_1.connectionPool.query(queryModels, function (error, data) {
                                    if (error) {
                                        resolve([]);
                                    }
                                    else {
                                        var photos = data;
                                        resolve(photos);
                                    }
                                });
                            })];
                    case 2:
                        models = _a.sent();
                        token = jwt.sign({
                            _id: data[0].id,
                            models: models.map(function (m) { return m.id; }),
                            roles: data[0].type === 0 ? rbac_1.Roles.Agency : rbac_1.Roles.Customer
                        }, process.env.JWT_TOKEN_SECRET, {
                            expiresIn: "3d",
                        });
                        return [2 /*return*/, response.status(200).json({
                                success: true,
                                user: data[0],
                                date: new Date(),
                                token: token,
                            })];
                    case 3: return [2 /*return*/, response.status(200).json({
                            success: false,
                            message: "Пользователь не найден",
                        })];
                }
            });
        }); });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Не удалось проверить пользователя",
            error: error,
        });
    }
};
exports.authme = authme;
var updateProfile = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, hash, query, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sql = "UPDATE profiles SET login = ?, password = ? WHERE id = ?;";
                return [4 /*yield*/, bcrypt.hash(request.body.params.password, saltRounds)];
            case 1:
                hash = _a.sent();
                query = mysql.format(sql, [request.body.params.login, hash, request.body.params.id, 0]);
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
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                response.status(500).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error_2,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;
var changePassword = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var decoded, sql, hash, query, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                decoded = jwt.verify(request.body.params.token, process.env.JWT_TOKEN_SECRET);
                request.id = decoded._id;
                if (!(decoded._id === request.body.params.login)) return [3 /*break*/, 2];
                sql = "UPDATE profiles SET password = ? WHERE login = ?;";
                return [4 /*yield*/, bcrypt.hash(request.body.params.password, saltRounds)];
            case 1:
                hash = _a.sent();
                query = mysql.format(sql, [hash, request.body.params.login]);
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
                return [3 /*break*/, 3];
            case 2: return [2 /*return*/, response.status(404).json({
                    success: false,
                    message: "server.error",
                    error: "",
                })];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                response.status(500).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error_3,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
var deleteProfile = function (request, response) {
    try {
        console.log(request.body.params.id);
        var sql = "INSERT INTO deleted_profiles (??, ??) VALUES (?, ?);";
        var query = mysql.format(sql, ["agency_id", "delete_date", request.body.params.id, new Date()]);
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
exports.deleteProfile = deleteProfile;
var getAgencies = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT id FROM profiles", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Ошибка при получении агентств",
                    error: error,
                });
            }
            else {
                var agencies = data;
                return response.json(agencies);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить агентства",
            error: error,
        });
    }
};
exports.getAgencies = getAgencies;
var loginEmail = function (request, response) {
    try {
        var sqlCheck = "SELECT EXISTS(SELECT id  FROM profiles WHERE login = ? LIMIT 1) AS exist";
        var queryCheck = mysql.format(sqlCheck, [request.body.params.login]);
        connectionPool_1.connectionPool.query(queryCheck, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                if (Number(data[0]["exist"]) === 0) {
                    return response.status(200).json({
                        success: false,
                        message: "server.there_is_no_user_with_username",
                        error: "",
                    });
                }
                else {
                    var mailOptions = {
                        from: "sexavenuex@gmail.com",
                        to: request.body.params.login,
                        subject: request.body.params.emailSubject,
                        html: request.body.params.html,
                    };
                    var transporter = nodemailer.createTransport({
                        host: "smtp.gmail.ru",
                        port: 587,
                        secure: false,
                        service: "gmail",
                        auth: {
                            user: "sexavenuex@gmail.com",
                            pass: "hfqarnmrocxwvxpp",
                        },
                    });
                    transporter.sendMail(mailOptions, function (error, _info) {
                        if (error) {
                            console.log(error);
                            response.status(500).json({
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
exports.loginEmail = loginEmail;
var restorePassword = function (request, response) {
    try {
        var sqlCheck = "SELECT EXISTS(SELECT id  FROM profiles WHERE login = ? LIMIT 1) AS exist";
        var queryCheck = mysql.format(sqlCheck, [request.body.params.login]);
        connectionPool_1.connectionPool.query(queryCheck, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                if (Number(data[0]["exist"]) === 0) {
                    return response.status(200).json({
                        success: false,
                        message: "server.there_is_no_user_with_username",
                        error: "",
                    });
                }
                else {
                    var mailOptions = {
                        from: "sexavenuex@gmail.com",
                        to: request.body.params.login,
                        subject: request.body.params.emailSubject,
                        html: request.body.params.html,
                    };
                    var transporter = nodemailer.createTransport({
                        host: "smtp.gmail.ru",
                        port: 587,
                        secure: false,
                        service: "gmail",
                        auth: {
                            user: "sexavenuex@gmail.com",
                            pass: "hfqarnmrocxwvxpp",
                        },
                    });
                    transporter.sendMail(mailOptions, function (error, _info) {
                        if (error) {
                            console.log(error);
                            response.status(500).json({
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
exports.restorePassword = restorePassword;
