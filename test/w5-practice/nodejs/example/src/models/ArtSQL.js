"use strict";

const db = require("../config/db");

// Profile
class ArtSQL {
  static getArtInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM artinfo WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  // Register
  static async registerArt(art) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO artinfo(account_id, art_name, art_price, art_image_path) VALUES(?, ?, ?, ?);";
      db.query(
        query,
        [
          art.account_id,
          art.art_name,
          art.art_price,
          art.art_image_path,
        ],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = ArtSQL;
