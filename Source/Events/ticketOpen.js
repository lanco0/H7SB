const {
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const client = global.client;
const config = require("../Configs/serverConfig");
const userModel = require("../Models/userData");
const guildModel = require("../Models/guildData");
const channelModel = require("../Models/channelData");
const emojiConfig = require("../Configs/emojiConfig");

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;

const kilit = new MessageButton()
.setStyle("SECONDARY")
.setLabel("Kapat")
.setEmoji("🔒")
.setCustomId("Kilit");

let member     = interaction.guild.members.cache.get(interaction.user.id)
let kanal      = interaction.guild.channels.cache.get(interaction.channel.id)
let userData    = await userModel.findOne({ userID: member.user.id })
let channelData = await channelModel.findOne({ channelID: kanal.id })
let user        = interaction.guild.members.cache.get(channelData ? channelData.data.userID : "");

const guildData =  await guildModel.findOne({ guildID: interaction.guild.id })

if(interaction.customId === "ticket_sos"){ 
if(userData) return interaction.reply({ content: `> ${emojiConfig.başarısız} **Başarasız!** Zaten aktif talebiniz bulunuyor. **Kanal:** <#${userData.channelID}>`, ephemeral: true });

interaction.deferReply({ ephemeral: true }).then(async a => {
setTimeout(async()=> {

        let role = interaction.guild.roles.cache.find(a => a.name === '@everyone')  
        let sayı = ( guildData ? guildData.sosID || 0 : 0 ) + 1
      interaction.guild.channels.create(`destek-#${sayı < 10 ? "00"+sayı : sayı < 100 ? "0"+sayı : sayı < 1000 ? sayı :   "000"}` , { 
        type: 'text',
        permissionOverwrites: [{ 
           id: role,
           deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] 
        }, 
        { 
           id: config.sosYetkiliRol,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        }, 
        { 
           id: member.id,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        } 
        ],
        reason: 'Destek '+ member.user.tag,
        parent: config.sosKategoriID 
     }).then(async c => {

   let embed = new MessageEmbed()
      .setTitle(`${member.user.tag} Talebi`)
      .setDescription(`${member.user.tag} tarafından talep açıldı.`)
      .setFooter("Talep üzerinde işlem yapmak için butonları kullanın.")
      .setColor("#ff00d7")

interaction.editReply(`> ${emojiConfig.başarılı} **Başarılı!** Talebiniz oluşturuldu. **Kanal:** <#${c.id}>`)
await c.send({ content: `<@${member.id}>, <@&${config.sosYetkiliRol}>`, embeds: [embed], components: [new MessageActionRow({ components: [kilit] })] }).then(async (x) => {

    await userModel.findOneAndUpdate({ userID: member.user.id }, { $set: { channelID: c.id } }, { upsert: true })
    await channelModel.findOneAndUpdate({ channelID: c.id }, { $set: { data: { userID: member.id, channelName: c.name, ID: sayı < 10 ? "00"+ sayı : sayı < 100 ? "0"+ sayı : sayı < 1000 ? sayı : "000", messageID: x.id } } }, { upsert: true })
    await guildModel.findOneAndUpdate({ guildID: interaction.guild.id }, { $inc: { sosID: 1 } }, { upsert: true })
})

                })
   }, 2000)
            });
        }

if(interaction.customId === "ticket_yönetici"){ 
if(userData) return interaction.reply({ content: `> ${emojiConfig.başarısız} **Başarasız!** Zaten aktif talebiniz bulunuyor. **Kanal:** <#${userData.channelID}>`, ephemeral: true });

interaction.deferReply({ ephemeral: true }).then(async a => {
setTimeout(async()=> {

        let role = interaction.guild.roles.cache.find(a => a.name === '@everyone')  
        let sayı = ( guildData ? guildData.yöneticiID || 0 : 0 ) + 1
      interaction.guild.channels.create(`ic-#${sayı < 10 ? "00"+sayı : sayı < 100 ? "0"+sayı : sayı < 1000 ? sayı :   "000"}` , { 
        type: 'text',
        permissionOverwrites: [{ 
           id: role,
           deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] 
        }, 
        { 
           id: config.yöneticiYetkiliRol,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        }, 
        { 
           id: member.id,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        } 
        ],
        reason: 'Destek '+ member.user.tag,
        parent: config.yöneticiKategoriID 
     }).then(async c => {

   let embed = new MessageEmbed()
      .setTitle(`${member.user.tag} Talebi`)
      .setDescription(`${member.user.tag} tarafından talep açıldı.`)
      .setFooter("Talep üzerinde işlem yapmak için butonları kullanın.")
      .setColor("#ff00d7")

interaction.editReply(`> ${emojiConfig.başarılı} **Başarılı!** Talebiniz oluşturuldu. **Kanal:** <#${c.id}>`)
await c.send({ content: `<@${member.id}>, <@&${config.yöneticiYetkiliRol}>`, embeds: [embed], components: [new MessageActionRow({ components: [kilit] })] }).then(async (x) => {

    await userModel.findOneAndUpdate({ userID: member.user.id }, { $set: { channelID: c.id } }, { upsert: true })
    await channelModel.findOneAndUpdate({ channelID: c.id }, { $set: { data: { userID: member.id, channelName: c.name, ID: sayı < 10 ? "00"+ sayı : sayı < 100 ? "0"+ sayı : sayı < 1000 ? sayı : "000", messageID: x.id } } }, { upsert: true })
    await guildModel.findOneAndUpdate({ guildID: interaction.guild.id }, { $inc: { yöneticiID: 1 } }, { upsert: true })
})

                })
   }, 2000)
            });
        }

if(interaction.customId === "ticket_hata"){ 
if(userData) return interaction.reply({ content: `> ${emojiConfig.başarısız} **Başarasız!** Zaten aktif talebiniz bulunuyor. **Kanal:** <#${userData.channelID}>`, ephemeral: true });

interaction.deferReply({ ephemeral: true }).then(async a => {
setTimeout(async()=> {

        let role = interaction.guild.roles.cache.find(a => a.name === '@everyone')  
        let sayı = ( guildData ? guildData.hataID || 0 : 0 ) + 1
      interaction.guild.channels.create(`ooc-#${sayı < 10 ? "00"+sayı : sayı < 100 ? "0"+sayı : sayı < 1000 ? sayı :   "000"}` , { 
        type: 'text',
        permissionOverwrites: [{ 
           id: role,
           deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] 
        }, 
        { 
           id: config.hataYetkiliRol,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        }, 
        { 
           id: member.id,
           allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        } 
        ],
        reason: 'Destek '+ member.user.tag,
        parent: config.hataKategoriID 
     }).then(async c => {

   let embed = new MessageEmbed()
      .setTitle(`${member.user.tag} Talebi`)
      .setDescription(`${member.user.tag} tarafından talep açıldı.`)
      .setFooter("Talep üzerinde işlem yapmak için butonları kullanın.")
      .setColor("#ff00d7")

interaction.editReply(`> ${emojiConfig.başarılı} **Başarılı!** Talebiniz oluşturuldu. **Kanal:** <#${c.id}>`)
await c.send({ content: `<@${member.id}>, <@&${config.hataYetkiliRol}>`, embeds: [embed], components: [new MessageActionRow({ components: [kilit] })] }).then(async (x) => {

    await userModel.findOneAndUpdate({ userID: member.user.id }, { $set: { channelID: c.id } }, { upsert: true })
    await channelModel.findOneAndUpdate({ channelID: c.id }, { $set: { data: { userID: member.id, channelName: c.name, ID: sayı < 10 ? "00"+ sayı : sayı < 100 ? "0"+ sayı : sayı < 1000 ? sayı : "000", messageID: x.id } } }, { upsert: true })
    await guildModel.findOneAndUpdate({ guildID: interaction.guild.id }, { $inc: { hataID: 1 } }, { upsert: true })
})

                })
   }, 2000)
            });
        }
};
module.exports.conf = {
  name: "interactionCreate",
};
