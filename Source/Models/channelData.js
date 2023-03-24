const { Schema, model } = require("mongoose");

const ticket = Schema({
  guildID: String,
  channelID: String,
  data: { type: Object, default: "" },
 });

module.exports = model("channelData", ticket);
