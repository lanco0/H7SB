const {
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const config = require("../Configs/serverConfig");
const userModel = require("../Models/userData");
const guildModel = require("../Models/guildData");
const channelModel = require("../Models/channelData");
const emojiConfig = require("../Configs/emojiConfig");
const client = global.client;
let cooldown = new Map()

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;

const evet = new MessageButton()
.setStyle("SUCCESS")
.setLabel("Evet")
.setCustomId("Evet");
const hayır = new MessageButton()
.setStyle("DANGER")
.setLabel("Hayır")
.setCustomId("Hayır");
const geriyükle = new MessageButton()
.setStyle("SUCCESS")
.setLabel("Geri Yükle")
.setCustomId("GeriYükle");
const sil = new MessageButton()
.setStyle("DANGER")
.setLabel("Desteği Kapat")
.setCustomId("DesteğiKapat");
const kilit = new MessageButton()
.setStyle("SECONDARY")
.setLabel("Kapat")
.setEmoji("🔒")
.setCustomId("Kilit");
let transcript = new MessageButton()
.setLabel("Transcript")
.setStyle("SECONDARY")
.setEmoji("📑")
.setCustomId("transcript")
//------------\\

//------------\\
let member      = interaction.guild.members.cache.get(interaction.user.id)
let kanal       = interaction.guild.channels.cache.get(interaction.channel.id)
let userData    = await userModel.findOne({ userID: interaction.user.id })
let objectData = await channelModel.findOne({ channelID: interaction.channel.id })
let channelData = objectData && objectData.data
let user        = interaction.guild.members.cache.get(channelData ? channelData.userID : "");

//------------\\

if(interaction.customId === "Kilit"){
interaction.channel.send({ content: `> ${emojiConfig.uyarı} **Dikkat!** Destek talebini kapatmak istediğine emin misin?`,
components: [new MessageActionRow({ components: [evet, hayır] })]
})

interaction.deferUpdate()
}
//------------\\

//------------\\
if(interaction.customId === "Evet"){

 await      kanal.permissionOverwrites.create(user, {  
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            })

await interaction.message.delete()
await interaction.channel.send({ content: `> ${emojiConfig.uyarı} **Kapalı!** <@${member}> Tarafından destek talebi kapatıldı.`,
components: [new MessageActionRow({ components: [geriyükle, sil, transcript] })] 
})

await userModel.findOneAndDelete({ userID: member.user.id })
await kanal.setName(`kapalı-${channelData ? channelData.ID : "000"}`)

await kanal.messages.fetch(channelData ? channelData.messageID || "" : "").then(x => x.delete()).catch(e => { })  
interaction.deferUpdate()
}
//------------\\

//------------\\
if(interaction.customId === "GeriYükle"){
          await  kanal.permissionOverwrites.create(user, {  
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            })

await interaction.channel.send({ content: `> ${emojiConfig.uyarı} **Dikkat!** <@` + user + `> Destek talebi tekrar açıldı.`,
components: [new MessageActionRow({ components: [kilit] })]  
})

await userModel.findOneAndUpdate({ userID: member.user.id }, { $set: { channelID: kanal.id } }, { upsert: true })
await kanal.setName(channelData ? channelData.channelName : "data-bulunamadı!")

interaction.message.delete()
interaction.deferUpdate()
}
//------------\\

//------------\\
if(interaction.customId === "DesteğiKapat"){
await userModel.findOneAndDelete({ userID: user.id })
await channelModel.findOneAndDelete({ channelID: kanal.id })

interaction.channel.delete()
interaction.deferUpdate()
}
//------------\\

//------------\\
if(interaction.customId === "Hayır"){
interaction.message.delete()

interaction.deferUpdate()
}
//------------\\

if(interaction.customId == "transcript") {
      let zaman = Date.now();
      let cooldownFetch = await cooldown.get(interaction.channel.id);
      if (cooldownFetch) {

        interaction.reply  ({
          content: `> ${emojiConfig.uyarı} **Dur!** Yavaş mod içerisindesin beklemelisin!`
        });

        return;
      }

      if (!cooldownFetch) {
        await cooldown.set(interaction.channel.id, zaman + 20000);

        setTimeout(async () => {
          await cooldown.delete(interaction.channel.id);
        }, 20000);
       

  let xChannel = interaction.guild.channels.cache.get(config.transcriptLog)
  let channelMessages = await interaction.channel.messages.fetch().catch(err => { });

  let mesajlar = channelMessages.filter(x => !x.author.bot).sort((a, b) => a.createdTimestamp - b.createdTimestamp).map(message => `${message.author.username}: | ${message.content}`).join('\n');

  const files = `./${interaction.channel.name}.txt`;
  const content = '\u200B'

  fs.writeFileSync(files, content);

  const cs = fs.readFileSync(`${interaction.channel.name}.txt`, 'utf-8');
  fs.writeFileSync(`${interaction.channel.name}.txt`, mesajlar + cs)
  const uwu = fs.readFileSync(`${interaction.channel.name}.txt`);
  const attachment = new Discord.MessageAttachment(uwu, `${interaction.channel.name}.txt`);

  xChannel.send({ content: `${interaction.channel.name} Kanalındaki Güncel Mesajlar!`, files: [attachment]}).catch(() => {})

  setTimeout(() => {
      fs.unlinkSync(`${interaction.channel.name}.txt`)
  }, 1000);

interaction.deferUpdate()
      }
}


};
module.exports.conf = {
  name: "interactionCreate",
};
