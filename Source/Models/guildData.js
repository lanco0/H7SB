const { Schema, model } = require("mongoose");

const ticket = Schema({
  guildID: String,
  sosID: { type: Number, default: 0 },
  yöneticiID: { type: Number, default: 0 },
  hataID: { type: Number, default: 0 },
  intID: { type: Number, default: 0 },
});

module.exports = model("guildData", ticket);
