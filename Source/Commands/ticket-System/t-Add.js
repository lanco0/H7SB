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
const channelModel = require("../../Models/channelData");

module.exports.run = async (bot, message, args) => {

  let data = await channelModel.findOne({ channelID: message.channel.id })
  if(!(data && data.data)) return message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu sadece destek kanallarında kullanabilirsin!`, allowedMentions: { repliedUser: false } });

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Lütfen bir üye belirtin.`, allowedMentions: { repliedUser: false } });

  await message.channel
    .permissionOverwrites.create(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true
    })
    .then(() => {
      message.reply({ content: `> ${emojiConfig.başarılı} **Başarılı!** Kullanıcı kanala eklendi. **Kullanıcı:** ${member}`, allowedMentions: { repliedUser: false } });
    })
    .catch(e => {
      message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Kullanıcıyı kanala eklerken hata aldım. **Hata:** \`\`\`${e.name +": " +e.message}\`\`\``, allowedMentions: { repliedUser: false } });
    });

};
module.exports.conf = {
  name: "ekle",
  aliases: ["add"],
};
