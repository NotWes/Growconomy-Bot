const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "$";
const token = "<YOUR DISCORD TOKEN>";

client.on("ready", async () => {
  await client.user.setActivity(`in ${client.guilds.size} servers | ${prefix}help`, { type: "PLAYING"});
  await client.user.setStatus("online");
  console.log(`Growconomy bot its online. Currently serving ${client.users.size} users in ${client.guilds.size} guilds and ${client.channels.size} channels.`);
});

client.on("message", async (message) => {
  const reply = async (c) => await message.channel.send(c);

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "ping")) {
    const m = await reply("Pong");
    const embed = new Discord.RichEmbed()
     .setTitle("Pong")
     .setColor("#000000")
     .setAuthor(message.author.tag, message.author.avatarURL) 
     .setDescription(`
Latency: ${m.createdTimestamp - message.createdTimestamp} 
Client Latency: ${Math.round(client.ping)}
      `) 
      .setTimestamp();
    await m.edit(embed);
  } 
});  