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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCaptchaGoogle = exports.getVerificationsforAgency = exports.verifyCaptcha = exports.getCaptcha = void 0;
var connectionPool_1 = require("../../connectionPool");
var canvas_1 = require("canvas");
require("dotenv/config");
var mysql = require("mysql");
var crypto = require("crypto");
var timeShowFrom = process.env.UPDATE_POSITION_CAPTCA_SHOW_FROM;
var timeShowTo = process.env.UPDATE_POSITION_CAPTCA_SHOW_TO;
var minNumOfKeys = Number(process.env.UPDATE_POSITION_MIN_NUMBER_OF_KEYS);
var maxNumOfKeys = Number(process.env.UPDATE_POSITION_MAX_NUMBER_OF_KEYS);
function getR(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to encrypt a string using a token
function encryptString(plainText, token) {
    return __awaiter(this, void 0, void 0, function () {
        var key, iv, cipher, encryptedData, tag;
        return __generator(this, function (_a) {
            key = crypto.pbkdf2Sync(token, '', 100000, 32, 'sha256');
            iv = crypto.randomBytes(12);
            cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
            encryptedData = cipher.update(plainText, 'utf8', 'hex');
            encryptedData += cipher.final('hex');
            tag = cipher.getAuthTag();
            return [2 /*return*/, iv.toString('hex') + encryptedData + tag.toString('hex')];
        });
    });
}
var getCaptcha = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var modelId, token, numberOfKeys, keysArray, verificationKey_1, index, captchaRandNumber, canvas, ctx, numberString, imageData, pixels, pixelArray, i, flipedPixelArray, i, fsSource, lastKey_1, sqlGet, queryGet, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                modelId = request.body.params.model_id;
                if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
                    return [2 /*return*/, response.status(500).json({
                            success: false,
                            message: "server.mistake_try_again",
                        })];
                }
                token = request.headers.authorization.split('.')[2];
                numberOfKeys = getR(minNumOfKeys, maxNumOfKeys);
                keysArray = [];
                verificationKey_1 = '';
                for (index = 0; index < numberOfKeys; index++) {
                    captchaRandNumber = getR(1, 9);
                    canvas = (0, canvas_1.createCanvas)(30, 30);
                    ctx = canvas.getContext('2d');
                    numberString = captchaRandNumber.toString();
                    ctx.font = 30 + "px Arial"; // Set the font size and family
                    ctx.fillText(numberString, getR(0, 12), -1 * getR(0, 6) + 30); // Draw the text
                    imageData = ctx.getImageData(0, 0, 30, 30);
                    pixels = imageData.data;
                    pixelArray = [];
                    for (i = 0; i < pixels.length; i += 4) {
                        pixelArray.push(pixels[i + 3]);
                    }
                    flipedPixelArray = [];
                    for (i = 0; i < 30; i += 1) {
                        flipedPixelArray = __spreadArray(__spreadArray([], pixelArray.slice(i * 30, (i + 1) * 30), true), flipedPixelArray, true);
                    }
                    fsSource = "#version 300 es\n          precision mediump float;\n          \n          uniform float u_time;\n          uniform vec2 u_resolution;\n          const int u_array[900] = int[900](".concat(flipedPixelArray, ");\n          out vec4 FragColor;\n\n          #define width 30\n          #define height 30\n\n          void main() {\n              if (u_time < ").concat(timeShowFrom, " || u_time > ").concat(timeShowTo, ") {\n                  discard; // Discard pixel if number is not being drawn yet\n              }\n\n              vec2 arrayCoord = gl_FragCoord.xy / u_resolution * vec2(width, height);\n              int index = int(arrayCoord.x) + int(arrayCoord.y) * width;\n\n              if (u_array[index] > 0) {\n                  FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n              } else {\n                  FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n              }\n          }\n      ");
                    keysArray.push({
                        key: captchaRandNumber,
                        value: fsSource
                    });
                    verificationKey_1 += '' + captchaRandNumber;
                }
                return [4 /*yield*/, encryptString(JSON.stringify(keysArray), token)];
            case 1:
                lastKey_1 = _a.sent();
                sqlGet = "SELECT * FROM verification WHERE agency_id = ? and model_id = ?";
                queryGet = mysql.format(sqlGet, [request.body.params.agency_id, modelId]);
                connectionPool_1.connectionPool.query(queryGet, function (error, data) {
                    if (error) {
                        return response.status(200).json({
                            success: false,
                            message: "server.mistake_try_again",
                        });
                    }
                    else {
                        if (data && data.length > 0) {
                            var attempts = data[0].attempts_number;
                            var lastTryDate = (new Date(data[0].last_try).toISOString()).substring(0, 13);
                            var newTryDate = (new Date().toISOString()).substring(0, 13);
                            if (attempts < 1 && lastTryDate == newTryDate) {
                                return response.status(200).json({
                                    success: false,
                                    message: "server.to_many_attempts",
                                });
                            }
                            else {
                                var sql = "UPDATE verification SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? and ?? = ?;";
                                var query = mysql.format(sql, [
                                    "attempts_number",
                                    (lastTryDate == newTryDate) ? (attempts - 1) : 5,
                                    "verification_key",
                                    verificationKey_1,
                                    "last_try",
                                    new Date().toISOString(),
                                    "agency_id",
                                    request.body.params.agency_id,
                                    "model_id",
                                    request.body.params.model_id,
                                ]);
                                connectionPool_1.connectionPool.query(query, function (error) {
                                    if (error) {
                                        return response.status(200).json({
                                            success: false,
                                            message: "server.mistake_try_again",
                                            error: error,
                                        });
                                    }
                                    else {
                                        return response.status(200).json({ success: true, key: lastKey_1 });
                                    }
                                });
                            }
                        }
                        else {
                            var sql = "INSERT INTO verification (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
                            var query = mysql.format(sql, [
                                "agency_id",
                                "model_id",
                                "verification_key",
                                "last_try",
                                request.body.params.agency_id,
                                request.body.params.model_id,
                                verificationKey_1,
                                new Date().toISOString(),
                            ]);
                            connectionPool_1.connectionPool.query(query, function (error) {
                                if (error) {
                                    return response.status(200).json({
                                        success: false,
                                        message: "server.mistake_try_again",
                                        error: error,
                                    });
                                }
                                else {
                                    return response.status(200).json({ success: true, key: lastKey_1 });
                                }
                            });
                        }
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                response.status(200).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error_1,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCaptcha = getCaptcha;
var verifyCaptcha = function (request, response) {
    try {
        var modelId = request.body.params.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(200).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        var sqlGet = "SELECT * FROM verification WHERE agency_id = ? and model_id = ?";
        var queryGet = mysql.format(sqlGet, [request.body.params.agency_id, modelId]);
        connectionPool_1.connectionPool.query(queryGet, function (error, data) {
            if (error) {
                return response.status(200).json({
                    success: false,
                    message: "server.mistake_try_again",
                });
            }
            else {
                var keyOriginal = data[0].verification_key;
                var keyUser = request.body.params.key;
                if (keyOriginal == keyUser) {
                    var sql = "UPDATE models SET ?? = ? WHERE id = ?";
                    var query = mysql.format(sql, [
                        'last_position_update',
                        new Date(),
                        request.body.params.model_id
                    ]);
                    connectionPool_1.connectionPool.query(query, function (error) {
                        if (error) {
                            return response.status(200).json({
                                success: false,
                                message: "Ошибка при получении модели",
                            });
                        }
                        else {
                            return response.status(200).json({ success: true });
                        }
                    });
                }
                else {
                    return response.status(200).json({
                        success: false,
                        message: "wrong_key",
                    });
                }
            }
        });
    }
    catch (error) {
        response.status(200).json({
            success: false,
            message: "server.mistake_try_again",
        });
    }
};
exports.verifyCaptcha = verifyCaptcha;
var getVerificationsforAgency = function (request, response) {
    try {
        var sqlGet = "SELECT id, model_id, attempts_number, last_try FROM verification WHERE agency_id = ?";
        var queryGet = mysql.format(sqlGet, [request.body.params.agency_id]);
        connectionPool_1.connectionPool.query(queryGet, function (error, data) {
            if (error) {
                return response.status(200).json({
                    success: false,
                    message: "server.mistake_try_again",
                });
            }
            else {
                return response.status(200).json({ success: true, data: data });
            }
        });
    }
    catch (error) {
        response.status(200).json({
            success: false,
            message: "server.mistake_try_again",
        });
    }
};
exports.getVerificationsforAgency = getVerificationsforAgency;
var verifyCaptchaGoogle = function (request, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                token = request.body.params.token;
                return [4 /*yield*/, fetch('https://www.google.com/recaptcha/api/siteverify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: "secret=".concat(process.env.REACT_APP_SECRET_KEY, "&response=").concat(token),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (data.success) {
                    return [2 /*return*/, res.status(200).json({ success: true })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({ success: false })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(200).json({
                    success: false,
                    message: "server.mistake_try_again",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.verifyCaptchaGoogle = verifyCaptchaGoogle;
