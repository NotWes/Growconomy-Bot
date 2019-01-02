const Discord = require("discord.js");
const mongoose = require("mongoose");
const uCooldown = new Set();
const fs = require("fs");
const { prefix } = require("../config.js");

module.exports.run = async (client, message) => {
  const reply = c => message.channel.send(c);
  client.msgs.push(message.content);
  if(message.author.bot) return;

  if (message.isMentioned(client.user))
  return message.channel.send(`👌 My prefix is \`${prefix}\`.`);

  if(!message.content.startsWith(prefix)) return;

  const messageArray = message.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  const command = client.commands.get(cmd.slice(prefix.length));
  if(!command) return;

  if (uCooldown.has(message.author.id)) return message.channel.send(`👎 Slow it dude. You have to wait a few before using ${cmd.help.name}`);
  uCooldown.add(message.author.id);

  try {
    comamnd.run(client, message, args, reply);
  } catch (e) {
    console.log("Error While Running Command " + ${cmd.help.name} + ":" + e);
    reply(`Couldn't run the command because \`${e}\``);
  }
}
