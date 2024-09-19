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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModel = exports.updateModelEnableByModerator = exports.updateModelEnable = exports.updateModelCurrencyTimezone = exports.updateModel = exports.addModelView = exports.addModel = exports.getModels = exports.getModelViews = exports.getModelsForAdmin = exports.getModelsForAgency = exports.getModelsForAll = void 0;
var fs_1 = require("fs");
var connectionPool_1 = require("../../../connectionPool");
var serverConfig_1 = require("../../../../serverConfig");
var mysql = require("mysql");
var fs = require("fs");
var path = require("path");
var getModelsForAll = function (request, response) {
    var sql = "UPDATE models SET last_online = ? WHERE agency_id = ?; SELECT * FROM models WHERE is_enable = 1 AND is_enable_by_moderator = 1 ORDER BY last_position_update DESC; SELECT * FROM contacts; SELECT * FROM model_piercings; SELECT * FROM blocked_countries; SELECT * FROM photos ORDER BY is_main DESC, type DESC, status DESC; SELECT * FROM tarifs; SELECT * FROM work_times; SELECT * FROM model_services; SELECT * FROM videos ORDER BY status DESC; SELECT * FROM model_languages; SELECT * FROM model_feedbacks ORDER BY create_date DESC; SELECT * FROM model_proposal_places;";
    var query = mysql.format(sql, [new Date(), request.query.profile_id]);
    return getModels(response, query);
};
exports.getModelsForAll = getModelsForAll;
var getModelsForAgency = function (request, response) {
    // console.log(request.query.profile_id, 'getModelsForAgency');
    var sql = "UPDATE models SET last_online = ? WHERE agency_id = ?; SELECT * FROM models WHERE agency_id = ? ORDER BY last_position_update DESC; SELECT * FROM contacts; SELECT * FROM model_piercings; SELECT * FROM blocked_countries; SELECT * FROM photos ORDER BY is_main DESC, type DESC, status DESC; SELECT * FROM tarifs; SELECT * FROM work_times; SELECT * FROM model_services; SELECT * FROM videos ORDER BY status DESC; SELECT * FROM model_languages; SELECT * FROM model_feedbacks ORDER BY create_date DESC; SELECT * FROM model_proposal_places;";
    var query = mysql.format(sql, [new Date(), request.query.profile_id, request.query.profile_id]);
    return getModels(response, query);
};
exports.getModelsForAgency = getModelsForAgency;
var getModelsForAdmin = function (request, response) {
    var sql = "UPDATE models SET last_online = ? WHERE agency_id = ?; SELECT * FROM models ORDER BY last_position_update DESC; SELECT * FROM contacts; SELECT * FROM model_piercings; SELECT * FROM blocked_countries; SELECT * FROM photos ORDER BY is_main DESC, type DESC, status DESC; SELECT * FROM tarifs; SELECT * FROM work_times; SELECT * FROM model_services; SELECT * FROM videos ORDER BY status DESC; SELECT * FROM model_languages; SELECT * FROM model_feedbacks ORDER BY create_date DESC; SELECT * FROM model_proposal_places;";
    var query = mysql.format(sql, [new Date(), request.query.profile_id]);
    return getModels(response, query);
};
exports.getModelsForAdmin = getModelsForAdmin;
var getModels = function (response, query) {
    try {
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Ошибка при получении моделей",
                    error: error,
                });
            }
            else {
                var models = data[1];
                var contacts_1 = data[2];
                var modelPiercings_1 = data[3];
                var blockedCountries_1 = data[4];
                var photos_1 = data[5];
                var tarifs_1 = data[6];
                var workTimes_1 = data[7];
                var modelServices_1 = data[8];
                var videos_1 = data[9];
                var modelLanguages_1 = data[10];
                var modelFeedbacks_1 = data[11];
                var modelProposalPlaces_1 = data[12];
                var modelsList_1 = [];
                models.forEach(function (model) {
                    modelsList_1.push(__assign(__assign({}, model), { contacts: contacts_1.filter(function (contact) { return contact.model_id === model.id; }), model_piercings: modelPiercings_1.filter(function (modelPiercing) { return modelPiercing.model_id === model.id; }), blocked_countries: blockedCountries_1.filter(function (blockedCountry) { return blockedCountry.model_id === model.id; }), photos: photos_1.filter(function (photo) { return photo.model_id === model.id; }), tarifs: tarifs_1.filter(function (tarif) { return tarif.model_id === model.id; }), work_times: workTimes_1.filter(function (workTime) { return workTime.model_id === model.id; }), model_services: modelServices_1.filter(function (modelService) { return modelService.model_id === model.id; }), videos: videos_1.filter(function (video) { return video.model_id === model.id; }), model_languages: modelLanguages_1.filter(function (modelLanguage) { return modelLanguage.model_id === model.id; }), model_feedbacks: modelFeedbacks_1.filter(function (modelFeedback) { return modelFeedback.model_id === model.id; }), model_proposal_places: modelProposalPlaces_1.filter(function (modelProposalPlace) { return modelProposalPlace.model_id === model.id; }) }));
                });
                return response.json(modelsList_1);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить модели",
            error: error,
        });
    }
};
exports.getModels = getModels;
var getModelViews = function (request, response) {
    try {
        var modelId = request.query.model_id;
        if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
            return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
            });
        }
        var sql = "SELECT * FROM model_views WHERE model_id = ?";
        var query = mysql.format(sql, [request.query.model_id]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Ошибка при получении просмотров модели",
                    error: error,
                });
            }
            else {
                var modelViews = data;
                return response.json(modelViews);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить просмотры модели",
            error: error,
        });
    }
};
exports.getModelViews = getModelViews;
var addModel = function (request, response) {
    try {
        var sql = "INSERT INTO models (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        var query = mysql.format(sql, [
            "name",
            "about_self",
            "agency_id",
            "age",
            "height",
            "weight",
            "country_id",
            "city_id",
            "district_id",
            "underground_id",
            "type_id",
            "orientation_id",
            "meeting_id",
            "ethnic_group_id",
            "hair_color_id",
            "hair_size_id",
            "breast_size_id",
            "breast_type_id",
            "meeting_place_id",
            "nationality_id",
            "trip_id",
            "smooker_id",
            "eyes_color_id",
            "pubis_hair_id",
            "is_pornstar",
            "tatoo_id",
            "last_online",
            "create_date",
            "currency_id",
            request.body.params.model.name,
            request.body.params.model.about_self,
            request.body.params.model.agency_id,
            request.body.params.model.age,
            request.body.params.model.height,
            request.body.params.model.weight,
            request.body.params.model.country_id,
            request.body.params.model.city_id,
            request.body.params.model.district_id,
            request.body.params.model.underground_id,
            request.body.params.model.type_id,
            request.body.params.model.orientation_id,
            request.body.params.model.meeting_id,
            request.body.params.model.ethnic_group_id,
            request.body.params.model.hair_color_id,
            request.body.params.model.hair_size_id,
            request.body.params.model.breast_size_id,
            request.body.params.model.breast_type_id,
            request.body.params.model.meeting_place_id,
            request.body.params.model.nationality_id,
            request.body.params.model.trip_id,
            request.body.params.model.smooker_id,
            request.body.params.model.eyes_color_id,
            request.body.params.model.pubis_hair_id,
            request.body.params.model.is_pornstar,
            request.body.params.model.tatoo_id,
            new Date(),
            new Date(),
            request.body.params.model.currency_id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var model_id_1 = data["insertId"];
                var sqlSecond_1 = "DELETE FROM contacts WHERE ?? = ?; ";
                var values_1 = ["model_id", model_id_1];
                request.body.params.model.contacts.forEach(function (contact) {
                    sqlSecond_1 += "INSERT INTO contacts (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?); ";
                    values_1.push("model_id", "phone_number", "is_telegram_enable", "is_whatsapp_enable", "is_wechat_enable", "is_botim_enable", model_id_1, contact.phone_number, contact.is_telegram_enable, contact.is_whatsapp_enable, contact.is_wechat_enable, contact.is_botim_enable);
                });
                sqlSecond_1 += "DELETE FROM blocked_countries WHERE ?? = ?; ";
                values_1.push("model_id", model_id_1);
                request.body.params.model.blocked_countries.forEach(function (blockedCountry) {
                    sqlSecond_1 += "INSERT INTO blocked_countries (??, ??) VALUES (?, ?); ";
                    values_1.push("model_id", "country_id", model_id_1, blockedCountry.country_id);
                });
                sqlSecond_1 += "DELETE FROM model_piercings WHERE ?? = ?; ";
                values_1.push("model_id", model_id_1);
                request.body.params.model.model_piercings.forEach(function (modelPiercing) {
                    sqlSecond_1 += "INSERT INTO model_piercings (??, ??) VALUES (?, ?); ";
                    values_1.push("model_id", "piercing_id", model_id_1, modelPiercing.piercing_id);
                });
                sqlSecond_1 += "DELETE FROM model_languages WHERE ?? = ?; ";
                values_1.push("model_id", model_id_1);
                request.body.params.model.model_languages.forEach(function (modelLanguage) {
                    sqlSecond_1 += "INSERT INTO model_languages (??, ??) VALUES (?, ?); ";
                    values_1.push("model_id", "language_id", model_id_1, modelLanguage.language_id);
                });
                sqlSecond_1 += "DELETE FROM model_proposal_places WHERE ?? = ?; ";
                values_1.push("model_id", model_id_1);
                request.body.params.model.model_proposal_places.forEach(function (modelProposalPlace) {
                    sqlSecond_1 += "INSERT INTO model_proposal_places (??, ??) VALUES (?, ?); ";
                    values_1.push("model_id", "place_id", model_id_1, modelProposalPlace.place_id);
                });
                var query_1 = mysql.format(sqlSecond_1, values_1);
                connectionPool_1.connectionPool.query(query_1, function (error) {
                    if (error) {
                        return response.status(404).json({
                            success: false,
                            message: "server.mistake_try_again",
                            error: error,
                        });
                    }
                    else {
                        return response.status(200).json({ success: true, model_id: model_id_1 });
                    }
                });
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
exports.addModel = addModel;
var updateModel = function (request, response) {
    try {
        var sql = "UPDATE models SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
        var query = mysql.format(sql, [
            "name",
            request.body.params.model.name,
            "about_self",
            request.body.params.model.about_self,
            "agency_id",
            request.body.params.model.agency_id,
            "age",
            request.body.params.model.age,
            "height",
            request.body.params.model.height,
            "weight",
            request.body.params.model.weight,
            "country_id",
            request.body.params.model.country_id,
            "city_id",
            request.body.params.model.city_id,
            "district_id",
            request.body.params.model.district_id,
            "underground_id",
            request.body.params.model.underground_id,
            "type_id",
            request.body.params.model.type_id,
            "orientation_id",
            request.body.params.model.orientation_id,
            "meeting_id",
            request.body.params.model.meeting_id,
            "ethnic_group_id",
            request.body.params.model.ethnic_group_id,
            "hair_color_id",
            request.body.params.model.hair_color_id,
            "hair_size_id",
            request.body.params.model.hair_size_id,
            "breast_size_id",
            request.body.params.model.breast_size_id,
            "breast_type_id",
            request.body.params.model.breast_type_id,
            "meeting_place_id",
            request.body.params.model.meeting_place_id,
            "nationality_id",
            request.body.params.model.nationality_id,
            "trip_id",
            request.body.params.model.trip_id,
            "smooker_id",
            request.body.params.model.smooker_id,
            "eyes_color_id",
            request.body.params.model.eyes_color_id,
            "pubis_hair_id",
            request.body.params.model.pubis_hair_id,
            "is_pornstar",
            request.body.params.model.is_pornstar,
            "tatoo_id",
            request.body.params.model.tatoo_id,
            "id",
            request.body.params.model.id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error, _data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                });
            }
            else {
                var sqlSecond_2 = "DELETE FROM contacts WHERE ?? = ?; ";
                var values_2 = ["model_id", request.body.params.model.id];
                request.body.params.model.contacts.forEach(function (contact) {
                    sqlSecond_2 += "INSERT INTO contacts (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?); ";
                    values_2.push("model_id", "phone_number", "is_telegram_enable", "is_whatsapp_enable", "is_wechat_enable", "is_botim_enable", contact.model_id, contact.phone_number, contact.is_telegram_enable, contact.is_whatsapp_enable, contact.is_wechat_enable, contact.is_botim_enable);
                });
                sqlSecond_2 += "DELETE FROM blocked_countries WHERE ?? = ?; ";
                values_2.push("model_id", request.body.params.model.id);
                request.body.params.model.blocked_countries.forEach(function (blockedCountry) {
                    sqlSecond_2 += "INSERT INTO blocked_countries (??, ??) VALUES (?, ?); ";
                    values_2.push("model_id", "country_id", request.body.params.model.id, blockedCountry.country_id);
                });
                sqlSecond_2 += "DELETE FROM model_piercings WHERE ?? = ?; ";
                values_2.push("model_id", request.body.params.model.id);
                request.body.params.model.model_piercings.forEach(function (modelPiercing) {
                    sqlSecond_2 += "INSERT INTO model_piercings (??, ??) VALUES (?, ?); ";
                    values_2.push("model_id", "piercing_id", request.body.params.model.id, modelPiercing.piercing_id);
                });
                sqlSecond_2 += "DELETE FROM model_languages WHERE ?? = ?; ";
                values_2.push("model_id", request.body.params.model.id);
                request.body.params.model.model_languages.forEach(function (modelLanguage) {
                    sqlSecond_2 += "INSERT INTO model_languages (??, ??) VALUES (?, ?); ";
                    values_2.push("model_id", "language_id", request.body.params.model.id, modelLanguage.language_id);
                });
                sqlSecond_2 += "DELETE FROM model_proposal_places WHERE ?? = ?; ";
                values_2.push("model_id", request.body.params.model.id);
                request.body.params.model.model_proposal_places.forEach(function (modelProposalPlace) {
                    sqlSecond_2 += "INSERT INTO model_proposal_places (??, ??) VALUES (?, ?); ";
                    values_2.push("model_id", "place_id", request.body.params.model.id, modelProposalPlace.place_id);
                });
                var query_2 = mysql.format(sqlSecond_2, values_2);
                connectionPool_1.connectionPool.query(query_2, function (error) {
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
    catch (error) {
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.updateModel = updateModel;
var updateModelEnable = function (request, response) {
    try {
        // const modelId = request.body.params.model_id
        // if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
        //   return response.status(500).json({
        //     success: false,
        //     message: "server.mistake_try_again",
        //   });
        // }
        var sql = "UPDATE models SET ?? = ? WHERE id = ?;";
        var query = mysql.format(sql, ["is_enable", request.body.params.is_enable, request.body.params.model_id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Ошибка при обновлении статуса модели",
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
            message: "Не удалось обновить статус модели",
            error: error,
        });
    }
};
exports.updateModelEnable = updateModelEnable;
var updateModelEnableByModerator = function (request, response) {
    try {
        var sql = "UPDATE models SET ?? = ? WHERE id = ?;";
        var query = mysql.format(sql, ["is_enable_by_moderator", request.body.params.is_enable_by_moderator, request.body.params.model_id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Ошибка при обновлении статуса модели",
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
            message: "Не удалось обновить статус модели",
            error: error,
        });
    }
};
exports.updateModelEnableByModerator = updateModelEnableByModerator;
var updateModelCurrencyTimezone = function (request, response) {
    try {
        // const modelId = request.body.params.model_id
        // if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
        //   return response.status(500).json({
        //     success: false,
        //     message: "server.mistake_try_again",
        //   });
        // }
        var sql = "UPDATE models SET ?? = ?, ?? = ? WHERE id = ?;";
        var query = mysql.format(sql, [
            "currency_id",
            request.body.params.currency_id,
            "time_zone",
            request.body.params.time_zone,
            request.body.params.model_id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Ошибка при обновлении валюты и часового пояса модели",
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
            message: "Не удалось обновить валюту и часовой пояс модели",
            error: error,
        });
    }
};
exports.updateModelCurrencyTimezone = updateModelCurrencyTimezone;
var deleteModel = function (request, response) {
    try {
        // const modelId = request.body.params.model_id
        // if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
        //   return response.status(500).json({
        //     success: false,
        //     message: "server.mistake_try_again",
        //   });
        // }
        var sql = "DELETE FROM models WHERE id = ?; DELETE FROM photos WHERE model_id = ?; DELETE FROM contacts WHERE model_id = ?; DELETE FROM videos WHERE model_id = ?; DELETE FROM model_piercings WHERE model_id = ?; DELETE FROM blocked_countries WHERE model_id = ?; DELETE FROM tarifs WHERE model_id = ?; DELETE FROM model_services WHERE model_id = ?; DELETE FROM work_times WHERE model_id = ?; DELETE FROM model_languages WHERE model_id = ?; ";
        var query = mysql.format(sql, [
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
            request.body.params.model_id,
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
                var directory_1 = path.join(serverConfig_1.default.directory, "uploads");
                request.body.params.photos.forEach(function (photo) {
                    if (fs.existsSync(path.join(directory_1, photo.photo_url))) {
                        (0, fs_1.unlink)(path.join(directory_1, photo.photo_url), function (error) {
                            if (error)
                                console.log(error);
                        });
                    }
                });
                request.body.params.videos.forEach(function (video) {
                    if (fs.existsSync(path.join(directory_1, video.video_url))) {
                        (0, fs_1.unlink)(path.join(directory_1, video.video_url), function (error) {
                            if (error)
                                console.log(error);
                        });
                    }
                });
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
exports.deleteModel = deleteModel;
var addModelView = function (request, response) {
    try {
        var sql = "INSERT INTO model_views (??, ??) values (?, ?);";
        var query = mysql.format(sql, ["model_id", "view_date", request.body.params.model_id, new Date()]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Ошибка при добавлении просмотра страницы модели",
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
            message: "Не удалось добавить просмотр страницы модели",
            error: error,
        });
    }
};
exports.addModelView = addModelView;
