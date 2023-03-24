const {
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const Discord = require("discord.js");
const { developersID } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");
const serverConfig = require("../../Configs/serverConfig");

module.exports.run = async (bot, message, args) => {

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(`> ${emojiConfig.başarısız} **Başarısız!** Lütfen bir üye belirtin.`);

  await message.channel
    .permissionOverwrites.create(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false
    })
    .then(() => {
      message.reply({ content: `> ${emojiConfig.başarılı} **Başarılı!** Kullanıcı kanaldan çıkarıldı. **Kullanıcı:** ${member}`, allowedMentions: { repliedUser: false } })
    }).catch(e => {
      message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Kullanıcıyı kanaldan çıkarırken hata aldım. **Hata:** \`\`\`${e.name + ": " + e.message}\`\`\``, allowedMentions: { repliedUser: false } })
   })

};
module.exports.conf = {
  name: "kaldır",
  aliases: ["çıkar"],
};
