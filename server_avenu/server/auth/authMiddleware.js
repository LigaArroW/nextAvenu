"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = exports.verifyToken = void 0;
// import { roles } from "./rbac";
require("dotenv/config");
var rbac_1 = require("./rbac");
var jwt = require('jsonwebtoken');
var verifyToken = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is required.' });
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
exports.verifyToken = verifyToken;
var checkPermissions = function (requiredPermissions) {
    return function (req, res, next) {
        var token = req.headers.authorization;
        if (!token) {
            return res.status(200).json({
                isSuccess: false,
                message: "Нет доступа",
            });
        }
        try {
            var user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = user;
            req.id = user._id;
            if (user && user.roles) {
                if (user.roles !== rbac_1.Roles.Admin && !requiredPermissions.includes(user.roles)) {
                    return res.status(200).json({
                        isSuccess: false,
                        message: "Нет доступа",
                    });
                }
                if (user.roles === rbac_1.Roles.SuperAdmin) {
                    req.isSuper = true;
                    // req.isAdmin = true
                    return next();
                }
                req.models = user.models || [];
                req.isAdmin = (user.roles === rbac_1.Roles.Admin);
                next();
            }
            else {
                return res.status(200).json({
                    isSuccess: false,
                    message: "Нет доступа",
                });
            }
        }
        catch (error) {
            return res.status(200).json({
                isSuccess: false,
                message: "Нет доступа",
            });
        }
    };
};
exports.checkPermissions = checkPermissions;
