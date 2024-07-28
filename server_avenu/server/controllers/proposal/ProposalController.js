"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProposalViews = exports.getProposalViews = exports.getProposals = exports.addProposal = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var addProposal = function (request, response) {
    try {
        var sql = "INSERT INTO proposals (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        var query = mysql.format(sql, [
            "name",
            "profile_id",
            "place",
            "min_price",
            "max_price",
            "description",
            "contact",
            "status",
            request.body.params.proposal.name,
            request.body.params.proposal.profile_id,
            request.body.params.proposal.place,
            request.body.params.proposal.min_price,
            request.body.params.proposal.max_price,
            request.body.params.proposal.description,
            request.body.params.proposal.contact,
            request.body.params.proposal.status,
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
        response.status(500).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
        });
    }
};
exports.addProposal = addProposal;
var getProposals = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM proposals", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Заказы не найдены",
                    error: error,
                });
            }
            else {
                var proposals = data;
                return response.json(proposals);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить заказы",
            error: error,
        });
    }
};
exports.getProposals = getProposals;
var getProposalViews = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM proposal_views", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Просмотры заказов не найдены",
                    error: error,
                });
            }
            else {
                var proposalViews = data;
                return response.json(proposalViews);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить просмотры заказов",
            error: error,
        });
    }
};
exports.getProposalViews = getProposalViews;
var updateProposalViews = function (request, response) {
    try {
        var sql_1 = "DELETE FROM proposal_views WHERE ?? = ?;";
        var values_1 = ["model_id", request.body.params.model_id];
        request.body.params.proposal_views.forEach(function (proposal_view) {
            sql_1 += "INSERT INTO proposal_views (??, ??) VALUES (?, ?);";
            values_1.push("model_id", "proposal_id", proposal_view.model_id, proposal_view.proposal_id);
        });
        var query = mysql.format(sql_1, values_1);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Не удалось обновить показы заказов",
                    error: error,
                });
            }
            else {
                var proposalViews = data;
                return response.json(proposalViews);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось обновить показы заказов",
            error: error,
        });
    }
};
exports.updateProposalViews = updateProposalViews;
