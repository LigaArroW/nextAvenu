import { connectionPool } from "../../../connectionPool";

import { IBlacklist } from "../../../../types/profile/blacklist/blacklist";
import { IBlacklistAccess } from "../../../../types/profile/blacklist/blacklistAccess";

const mysql = require("mysql");

const getBlacklist = (_request, response) => {

  try {
    const sql = "SELECT * FROM blacklist WHERE agency_id = ?";
    const query = mysql.format(sql, [_request.query.agency_id]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Ошибка при получении черного списка",
          error: error,
        });
      } else {
        const blacklist = data as IBlacklist[];
        return response.json(blacklist);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить черный список",
      error: error,
    });
  }
};

const addBlacklist = (request, response) => {
  try {
    const sql = "INSERT INTO blacklist (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) WHERE agency_id = ?;";
    const query = mysql.format(sql, [
      "agency_id",
      "country_id",
      "city_id",
      "phone_number",
      "description",
      request.body.params.agency_id,
      request.body.params.country_id,
      request.body.params.city_id,
      request.body.params.phone_number,
      request.body.params.description,
      request.body.params.agency_id
    ]);
    console.log(query);

    connectionPool.query(query, (error) => {
      if (error) {
        console.log("🚀 ~ connectionPool.query ~ error:", error)
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const deleteBlacklist = (request, response) => {
  try {
    const sql = "DELETE FROM blacklist WHERE ?? = ? AND agency_id = ?;";
    const query = mysql.format(sql, ["id", request.body.params.id, request.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const getBlacklistAccess = (request, response) => {
  try {
    const sql = "SELECT * FROM blacklist_access WHERE agency_id = ? OR access_to = ?";
    const query = mysql.format(sql, [request.id, request.id]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Ошибка при получении доступа к черному списку",
          error: error,
        });
      } else {
        const blacklistAccess = data as IBlacklistAccess[];
        return response.json(blacklistAccess);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить доступ к черному списку",
      error: error,
    });
  }
};

const addBlacklistAccess = (request, response) => {
  try {
    const sql = "INSERT INTO blacklist_access (??, ??) VALUES (?, ?);";
    const query = mysql.format(sql, [
      "agency_id",
      "access_to",
      request.id,
      request.body.params.access_to,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const deleteBlacklistAccess = (request, response) => {
  try {
    const sql = "DELETE FROM blacklist_access WHERE ?? = ? AND agency_id = ?;";
    const query = mysql.format(sql, ["id", request.body.params.id, request.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

export { addBlacklist, addBlacklistAccess, deleteBlacklist, deleteBlacklistAccess, getBlacklist, getBlacklistAccess };
