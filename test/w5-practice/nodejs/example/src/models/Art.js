"use strict";

const ArtSQL = require("./ArtSQL");

class Art {
  constructor(body) {
    this.body = body;
  }

  async showArt() {
    const client = this.body;
    try {
        const art = await ArtSQL.getArtInfo(client.id);
        if (art) {
            return { success: true, art };
        }
    } catch (err) {
        return { success: false, err };
      }
  }

  async registerArt() {
    const client = this.body;
    try {
      const response = await ArtSQL.registerArt(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }


}

module.exports = Art;
