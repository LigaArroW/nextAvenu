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
exports.getProposalPlaces = exports.getlanguages = exports.getWorkDurations = exports.deleteUnderground = exports.updateUnderground = exports.addUnderground = exports.getUndergrounds = exports.getTrips = exports.getTatoos = exports.getSmookers = exports.getSiteLanguages = exports.getServiceCategories = exports.getPubisHairs = exports.getPiercings = exports.getOrientations = exports.getNationalities = exports.getModelTypes = exports.getMeetings = exports.getMeetingPlaces = exports.getHairSizes = exports.getHairColors = exports.getEyesColors = exports.getEthnicGroups = exports.deleteDistrict = exports.updateDistrict = exports.addDistrict = exports.getDistricts = exports.getDaysOfWeek = exports.getCurrencies = exports.getCountries = exports.getCities = exports.getBreastTypes = exports.getBreastSizes = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getSiteLanguages = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM site_languages", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Языки не найдены",
                    error: error,
                });
            }
            else {
                var languages = data;
                return response.json(languages);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить языки",
            error: error,
        });
    }
};
exports.getSiteLanguages = getSiteLanguages;
var getCountries = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM countries WHERE is_enable = 1", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Страны не найдены",
                    error: error,
                });
            }
            else {
                var countries = data;
                return response.json(countries);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить страны",
            error: error,
        });
    }
};
exports.getCountries = getCountries;
var getCities = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT cit.id, cit.city, cit.country_id, cit.city_eng FROM cities as cit INNER JOIN countries as cou ON cit.country_id = cou.id WHERE cou.is_enable = 1;", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Города не найдены",
                    error: error,
                });
            }
            else {
                var cities = data;
                return response.json(cities);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить города",
            error: error,
        });
    }
};
exports.getCities = getCities;
var getDistricts = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT dis.id, dis.district, dis.city_id, dis.district_eng FROM districts as dis INNER JOIN cities as cit ON dis.city_id = cit.id INNER JOIN countries as cou ON cit.country_id = cou.id  WHERE cou.is_enable = 1", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Районы не найдены",
                    error: error,
                });
            }
            else {
                var districts = data;
                return response.json(districts);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить районы",
            error: error,
        });
    }
};
exports.getDistricts = getDistricts;
var addDistrict = function (_request, response) {
    try {
        var sql = "INSERT INTO districts (??, ??, ??) VALUES (?, ?, ?);";
        var query = mysql.format(sql, [
            'city_id',
            'district',
            'district_eng',
            1,
            _request.body.params.district,
            _request.body.params.district_eng
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить районы",
                    error: error,
                });
            }
            else {
                return response.json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось добавить районы",
            error: error,
        });
    }
};
exports.addDistrict = addDistrict;
var updateDistrict = function (_request, response) {
    try {
        var sql = "UPDATE districts SET district = ?, district_eng = ? WHERE id = ?;";
        var query = mysql.format(sql, [_request.body.params.district, _request.body.params.district_eng, _request.body.params.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось обновить район",
                    error: error,
                });
            }
            else {
                return response.json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось обновить район",
            error: error,
        });
    }
};
exports.updateDistrict = updateDistrict;
var deleteDistrict = function (_request, response) {
    try {
        var sql = "DELETE FROM districts WHERE id = ?;";
        var query = mysql.format(sql, [_request.body.params.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось удалить район",
                    error: error,
                });
            }
            else {
                return response.json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось удалить район",
            error: error,
        });
    }
};
exports.deleteDistrict = deleteDistrict;
var getUndergrounds = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT und.id, und.underground, und.city_id, und.underground_eng FROM undergrounds as und INNER JOIN cities as cit ON und.city_id = cit.id INNER JOIN countries as cou ON cit.country_id = cou.id  WHERE cou.is_enable = 1", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Метро не найдены",
                    error: error,
                });
            }
            else {
                var undergrounds = data;
                return response.json(undergrounds);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить метро",
            error: error,
        });
    }
};
exports.getUndergrounds = getUndergrounds;
var addUnderground = function (_request, response) {
    try {
        var sql = "INSERT INTO undergrounds (??, ??, ??) VALUES (?, ?, ?);";
        var query = mysql.format(sql, [
            'city_id',
            'underground',
            'underground_eng',
            1,
            _request.body.params.underground,
            _request.body.params.underground_eng
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить станцию",
                    error: error,
                });
            }
            else {
                return response.json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось добавить станцию",
            error: error,
        });
    }
};
exports.addUnderground = addUnderground;
var updateUnderground = function (_request, response) {
    try {
        var sql = "UPDATE undergrounds SET underground = ?, underground_eng = ? WHERE id = ?;";
        var query = mysql.format(sql, [_request.body.params.underground, _request.body.params.underground_eng, _request.body.params.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось обновить станцию",
                    error: error,
                });
            }
            else {
                return response.json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось обновить станцию",
            error: error,
        });
    }
};
exports.updateUnderground = updateUnderground;
var deleteUnderground = function (_request, response) {
    try {
        var sql = "DELETE FROM undergrounds WHERE id = ?;";
        var query = mysql.format(sql, [_request.body.params.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось удалить станцию",
                    error: error,
                });
            }
            else {
                return response.json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось удалить станцию",
            error: error,
        });
    }
};
exports.deleteUnderground = deleteUnderground;
var getModelTypes = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM model_types", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Типы профиля не найдены",
                    error: error,
                });
            }
            else {
                var modelTypes = data;
                return response.json(modelTypes);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить типы профиля",
            error: error,
        });
    }
};
exports.getModelTypes = getModelTypes;
var getOrientations = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM orientations", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Ориентации не найдены",
                    error: error,
                });
            }
            else {
                var orientations = data;
                return response.json(orientations);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить ориентации",
            error: error,
        });
    }
};
exports.getOrientations = getOrientations;
var getMeetings = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM meetings", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Встречи не найдены",
                    error: error,
                });
            }
            else {
                var meetings = data;
                return response.json(meetings);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить встречи",
            error: error,
        });
    }
};
exports.getMeetings = getMeetings;
var getEthnicGroups = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM ethnic_groups", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Этнические группы не найдены",
                    error: error,
                });
            }
            else {
                var ethnicGroups = data;
                return response.json(ethnicGroups);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить этнические группы",
            error: error,
        });
    }
};
exports.getEthnicGroups = getEthnicGroups;
var getHairColors = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM hair_colors", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Цвета волос не найдены",
                    error: error,
                });
            }
            else {
                var hairColors = data;
                return response.json(hairColors);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить цвета волос",
            error: error,
        });
    }
};
exports.getHairColors = getHairColors;
var getHairSizes = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM hair_sizes", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Длины волос не найдены",
                    error: error,
                });
            }
            else {
                var hairSizes = data;
                return response.json(hairSizes);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить длины волос",
            error: error,
        });
    }
};
exports.getHairSizes = getHairSizes;
var getBreastSizes = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM breast_sizes", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Размеры груди не найдены",
                    error: error,
                });
            }
            else {
                var breastSizes = data;
                return response.json(breastSizes);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить размеры груди",
            error: error,
        });
    }
};
exports.getBreastSizes = getBreastSizes;
var getBreastTypes = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM breast_types", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Типы груди не найдены",
                    error: error,
                });
            }
            else {
                var breastTypes = data;
                return response.json(breastTypes);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить типы груди",
            error: error,
        });
    }
};
exports.getBreastTypes = getBreastTypes;
var getMeetingPlaces = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM meeting_places", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Места встречи не найдены",
                    error: error,
                });
            }
            else {
                var meetingPlaces = data;
                return response.json(meetingPlaces);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить места встречи",
            error: error,
        });
    }
};
exports.getMeetingPlaces = getMeetingPlaces;
var getNationalities = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM nationalities", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Национальности не найдены",
                    error: error,
                });
            }
            else {
                var nationalities = data;
                return response.json(nationalities);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить национальности",
            error: error,
        });
    }
};
exports.getNationalities = getNationalities;
var getTrips = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM trips", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Поездки не найдены",
                    error: error,
                });
            }
            else {
                var trips = data;
                return response.json(trips);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить поездки",
            error: error,
        });
    }
};
exports.getTrips = getTrips;
var getlanguages = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM languages", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Языки не найдены",
                    error: error,
                });
            }
            else {
                var languages = data;
                return response.json(languages);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить языки",
            error: error,
        });
    }
};
exports.getlanguages = getlanguages;
var getTatoos = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM tatoos", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Татуировки не найдены",
                    error: error,
                });
            }
            else {
                var tatoos = data;
                return response.json(tatoos);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить татуировки",
            error: error,
        });
    }
};
exports.getTatoos = getTatoos;
var getSmookers = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM smookers", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Курильщики не найдены",
                    error: error,
                });
            }
            else {
                var smookers = data;
                return response.json(smookers);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить курильщиков",
            error: error,
        });
    }
};
exports.getSmookers = getSmookers;
var getEyesColors = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM eyes_colors", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Цвета глаз не найдены",
                    error: error,
                });
            }
            else {
                var eyesColors = data;
                return response.json(eyesColors);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить цвета глаз",
            error: error,
        });
    }
};
exports.getEyesColors = getEyesColors;
var getPubisHairs = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM pubis_hairs", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Лобковые волосы не найдены",
                    error: error,
                });
            }
            else {
                var pubisHairs = data;
                return response.json(pubisHairs);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить лобковые волосы",
            error: error,
        });
    }
};
exports.getPubisHairs = getPubisHairs;
var getCurrencies = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM currencies", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Валюты не найдены",
                    error: error,
                });
            }
            else {
                var currencies = data;
                return response.json(currencies);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить валюты",
            error: error,
        });
    }
};
exports.getCurrencies = getCurrencies;
var getWorkDurations = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM work_durations", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Продолжительности работы не найдены",
                    error: error,
                });
            }
            else {
                var workDurations = data;
                return response.json(workDurations);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить продолжительности работы",
            error: error,
        });
    }
};
exports.getWorkDurations = getWorkDurations;
var getDaysOfWeek = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM days_of_week", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Дни недели не найдены",
                    error: error,
                });
            }
            else {
                var daysOfWeek = data;
                return response.json(daysOfWeek);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить дни недели",
            error: error,
        });
    }
};
exports.getDaysOfWeek = getDaysOfWeek;
var getServiceCategories = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM service_categories; SELECT * FROM services", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Сервисы не найдены",
                    error: error,
                });
            }
            else {
                var serviceCategories = data[0];
                var services_1 = data[1];
                var serviceCategoriesList_1 = [];
                serviceCategories.forEach(function (serviceCategory) {
                    serviceCategoriesList_1.push(__assign(__assign({}, serviceCategory), { services: services_1.filter(function (service) { return service.service_category_id === serviceCategory.id; }) }));
                });
                return response.json(serviceCategoriesList_1);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить сервисы",
            error: error,
        });
    }
};
exports.getServiceCategories = getServiceCategories;
var getPiercings = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM piercings", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Пирсинги не найдены",
                    error: error,
                });
            }
            else {
                var piercings = data;
                return response.json(piercings);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить пирсинги",
            error: error,
        });
    }
};
exports.getPiercings = getPiercings;
var getProposalPlaces = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM proposal_places", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Места для выезда не найдены",
                    error: error,
                });
            }
            else {
                var proposalPlaces = data;
                return response.json(proposalPlaces);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить места для выезда",
            error: error,
        });
    }
};
exports.getProposalPlaces = getProposalPlaces;
