const { Client, Collection } = require("discord.js");
const { prefixs, developersID, token } = require("./Source/Configs/botConfig");
const bot = (global.client = new Client({
  fetchAllMembers: true,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
}));

bot.default_Cmd = new Collection();
bot.aliases = new Collection();

require("./Source/Handlers/command-Handler");
require("./Source/Handlers/event-Handler");
require("./Source/Handlers/mongo-Handler");

bot
  .login(token)
  .then((x) => console.log(`[BOT] Successfully ${bot.user.tag} activated.`))
  .catch((err) => console.log("[BOT] Failed to login:\n" + err));