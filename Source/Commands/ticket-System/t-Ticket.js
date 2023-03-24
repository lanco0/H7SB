const {
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  Permissions
} = require("discord.js");
const Discord = require("discord.js");
const { developersID } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");
const serverConfig = require("../../Configs/serverConfig");

module.exports.run = async (bot, message, args) => {
const client = bot;

  if (!developersID.includes(message.author.id)) {
    return; 
  }

      let ticketSos = new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Genel Destek!")
        .setCustomId("ticket_sos");

      let ticketYönetici = new MessageButton()
        .setStyle("DANGER")
        .setLabel("IC Destek!")
        .setCustomId("ticket_yönetici");

      let ticketHata = new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("OOC Destek!")
        .setCustomId("ticket_hata");

        let embed = new Discord.MessageEmbed()
          .setTitle("Yardıma mı ihtiyacınız var? Bilet oluştur!")
          .setDescription(`> DR Hogwarts Roleplay'nin destek kanalına hoş geldiniz. Destek almak için aşağıdaki biletlerden birini açın!`)
          .addField("Genel Ticket ↷", "> Genel Sorun için bir destek bileti açar.")
          .addField("IC Ticket ↷", "> Evren içerisinde ki problemler için bir destek bileti açar.")
          .addField("OOC Ticket ↷", "> Discord içerisinde ki problemler için bir destek bileti açar.")
          .setColor("AQUA")

       await message.channel.send({ embeds: [embed], components: [new MessageActionRow({ components: [ticketSos, ticketYönetici, ticketHata] })] });

};
module.exports.conf = {
  name: "ticket",
  aliases: [],
};
