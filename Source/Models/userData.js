const { Schema, model } = require("mongoose");

const ticket = Schema({
  guildID: String,
  channelID: String,
  userID: String,
  data: { type: Object, default: "" },
 });

module.exports = model("userData", ticket);
